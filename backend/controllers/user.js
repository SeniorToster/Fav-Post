const bcrypt = require('bcrypt');
const Users = require('../models');
const { generationTokens } = require('../service/token-service');

async function registrationUser(req, res) {
  const { email, name, password } = req.body;
  const isUser = await Users.findOne({ while: { email: email } });

  if (!isUser) {
    throw new Error('Пользователь с данным почтовым адресов уже существует');
  }
  const hashPassword = bcrypt(password, 7);
  const user = await Users.create({ name, email, password: hashPassword });
  generationTokens()
}



module.exports = { registrationUser };
