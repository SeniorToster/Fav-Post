const jwt = require('jsonwebtoken');
const { Tokens } = require('../models');

function generationTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  return { accessToken, refreshToken };
}

async function saveToken(userId, refreshToken) {
  const tokenDB = await Tokens.findOne({ while: { user_id: userId } });
  if (tokenDB) {
    tokenDB.token = refreshToken;
    return tokenDB.save();
  }
  return Tokens.create({ user_id: userId, token: refreshToken });
}

module.exports = { generationTokens, saveToken };
