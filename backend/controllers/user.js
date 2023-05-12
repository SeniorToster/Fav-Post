const { validationResult } = require('express-validator');
const { apiError } = require('../service/error-service');
const {
  registrationService,
  refreshService,
  loginService,
  usersService,
  userFindService,
} = require('../service/user-service');
const { removeToken } = require('../service/token-service');

async function registrationUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      throw apiError.badRequest('Ошибка валидации', errors.array());

    const { name, email, password } = req.body;
    const userData = await registrationService(name, email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
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
    const userData = await loginService(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const { refreshToken = '' } = req.cookies;

    await removeToken(refreshToken);

    res.clearCookie('refreshToken');
    return res.status(200).json({ status: 200, message: 'logout' });
  } catch (error) {
    next(error);
  }
}

async function refreshTokenUser(req, res, next) {
  try {
    const { refreshToken = '' } = req.cookies;
    const userData = await refreshService(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
}

async function usersAll(req, res, next) {
  try {
    const userData = await usersService();
    return res.json(userData);
  } catch (error) {
    next(error);
  }
}

async function userFind(req, res, next) {
  try {
    const userId = req?.params?.userId;
    const userData = await userFindService(userId);

    return res.json(userData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  usersAll,
  userFind,
};
