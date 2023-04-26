const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.BD_DATABASE,
  process.env.BD_USER,
  process.env.BD_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect: 'postgres',
  }
);

const Users = require('./Users')(sequelize, Sequelize.DataTypes);

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Соединение успешно установлено.');
  } catch (error) {
    console.error('Не удается подключиться к базе данных:', error);
  }
})();

module.exports = { Users };
