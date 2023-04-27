function apiError() {
  let api = {};

  api.unauthorizedError = () => ({
    status: 401,
    message: 'пользователь не авторизован',
  });

  api.badRequest = (message, errors = []) => ({ status: 400, message, errors });

  return api;
}

module.exports.apiError = apiError();
