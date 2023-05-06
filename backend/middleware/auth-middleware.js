const { apiError } = require('../service/error-service');
const { validateAccessToken } = require('../service/token-service');

module.exports = function AuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw apiError.unauthorizedError();

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) throw apiError.unauthorizedError();

    const userData = validateAccessToken(accessToken);

    if (!userData) throw apiError.unauthorizedError();

    req.user = userData;
    return next();
  } catch (e) {
    next(apiError.unauthorizedError());
  }
};
