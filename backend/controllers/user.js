const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

const { generationTokens, saveToken } = require('../service/token-service');
const { apiError } = require('../service/error-service');
const { Users } = require('../models');

async function registrationUser(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw apiError.badRequest('Ошибка валидации', errors.array());
    }
    const { email, name, password } = req.body;
    const isUser = await Users.findOne({ where: { email: email } });

    if (isUser) {
      throw apiError.badRequest(
        'Пользователь с данным почтовым адресом уже существует'
      );
    }

    const hashPassword = await bcrypt.hash(password, 7);
    const id = uuid.v4();

    await Users.create({
      id,
      name,
      email,
      password: hashPassword,
    });

    const tokens = generationTokens({ id, name, email });
    await saveToken(id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ ...tokens, user: { id, name, email } });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw apiError.badRequest('Ошибка валидации', errors.array());
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (user) {
      throw apiError.badRequest('Неверный почтовый адрес');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw apiError.badRequest('Неверный пароль');
    }

    const tokens = generationTokens({ id, name, email });
    await saveToken(id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ ...tokens, user: { id, name, email } });
  } catch (error) {
    next(error);
  }
}

module.exports = { registrationUser, loginUser };
