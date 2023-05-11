const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const {
  generationTokens,
  saveToken,
  validateRefreshToken,
  findToken,
} = require('../service/token-service');
const userDto = require('../dtos/user-dto');
const { apiError } = require('./error-service');

async function registrationService(name, email, password) {
  const isUser = await Users.findOne({ where: { email: email } });

  if (isUser) {
    throw apiError.badRequest(
      'Пользователь с данным почтовым адресом уже существует'
    );
  }

  const hashPassword = await bcrypt.hash(password, 7);
  const id = uuid.v4();

  const user = await Users.create({
    id,
    name,
    email,
    password: hashPassword,
  });

  const userData = userDto(user);
  const tokens = generationTokens(userData);
  await saveToken(userData.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userData,
  };
}

module.exports = {
  registrationService,
};

async function loginService(email, password) {
  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    throw apiError.badRequest('Неверный почтовый адрес');
  }

  const isPasswordEquals = await bcrypt.compare(password, user.password);

  if (!isPasswordEquals) {
    throw apiError.badRequest('Неверный пароль');
  }

  const tokens = generationTokens({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  await saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

async function refreshService(refreshToken) {
  if (!refreshToken) throw apiError.unauthorizedError();

  const validateToken = validateRefreshToken(refreshToken);
  const userTokenDB = await findToken(refreshToken);

  if (!validateToken || !userTokenDB) throw apiError.unauthorizedError();

  const user = await Users.findOne({ where: { id: validateToken.id } });
  const userData = userDto(user);

  const tokens = generationTokens(userData);
  await saveToken(userData.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userData,
  };
}

async function usersService() {
  const users = await Users.findAll();

  return users;
}
async function userFindService(userId) {
  const user = await Users.findOne({ where: { id:userId } });

  if (!user) {
    throw apiError.badRequest('данный пользователь не найден');
  }

  return user;
}

module.exports = {
  registrationService,
  loginService,
  refreshService,
  usersService,
  userFindService,
};
