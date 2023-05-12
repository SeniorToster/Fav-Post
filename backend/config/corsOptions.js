const { apiError } = require('../service/error-service');

const whitelist = [
  'http://localhost:5173',
  'http://localhost:6000',
  'http://127.0.0.1:5173',
  'http://authgit.1293863-co27853.tw1.ru',
  'http://1293863-co27853.tw1.ru',
];

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
