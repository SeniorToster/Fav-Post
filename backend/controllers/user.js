const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { Users } = require('../models');
const { generationTokens, saveToken } = require('../service/token-service');
const { apiError } = require('../service/error-service');

async function registrationUser(req, res, next) {
  try {
    const { email, name, password } = req.body;
    const isUser = await Users.findOne({ while: { email: email } });

    if (isUser) {
      console.log(apiError);
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

module.exports = { registrationUser };
