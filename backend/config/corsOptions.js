const { apiError } = require('../service/error-service');

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173'];

exports.corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(apiError.badRequest('Не разрешено CORS'));
    }
  },
  credentials: true,
};
