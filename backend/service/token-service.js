const jwt = require('jsonwebtoken');
const { Tokens } = require('../models');

function generationTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  return { accessToken, refreshToken };
}

function validateRefreshToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return data;
  } catch (e) {
    return null;
  }
}

function validateAccessToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return data;
  } catch (e) {
    return null;
  }
}

async function saveToken(userId, refreshToken) {
  const tokenDB = await Tokens.findOne({ where: { user_id: userId } });
  if (tokenDB) {
    tokenDB.token = refreshToken;
    return tokenDB.save();
  }
  return Tokens.create({ user_id: userId, token: refreshToken });
}

async function removeToken(refreshToken) {
  await Tokens.destroy({ where: { token: refreshToken } });
  return;
}

async function findToken(token) {
  const tokenDB = await Tokens.findOne({ where: { token } });
  return tokenDB;
}

module.exports = {
  generationTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  validateAccessToken,
  findToken,
};
