const { Sequelize, DataTypes } = require('sequelize');

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
module.exports = { DataTypes, sequelize };

const Users = require('./Users');
const Tokens = require('./Tokens');
const Posts = require('./Posts');
const LikesPosts = require('./LikesPosts');

Users.hasOne(Tokens, { as: 'token', foreignKey: 'user_id' });
Posts.hasOne(Users, {
  as: 'ownerUser',
  sourceKey: 'owner_post',
  foreignKey: 'id',
});

Users.hasMany(Posts, { as: 'myPosts', foreignKey: 'owner_post' });

Users.belongsToMany(Posts, {
  through: LikesPosts,
  uniqueKey: 'id',
  as: 'likes',
});
Posts.belongsToMany(Users, {
  through: LikesPosts,
  uniqueKey: 'id',
  as: 'likes',
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Соединение успешно установлено.');
  } catch (error) {
    console.error('Не удается подключиться к базе данных:', error);
  }
})();

module.exports = { Users, Tokens, Posts, LikesPosts };
