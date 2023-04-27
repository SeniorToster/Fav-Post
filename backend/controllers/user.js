const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { Users } = require('../models');
const { generationTokens, saveToken } = require('../service/token-service');

async function registrationUser(req, res) {
  try {
    const { email, name, password } = req.body;
    const isUser = await Users.findOne({ while: { email: email } });

    if (isUser) {
      throw new Error('Пользователь с данным почтовым адресов уже существует');
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
    console.log(error);
  }
}

module.exports = { registrationUser };
