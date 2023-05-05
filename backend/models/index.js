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
const Tokens = require('./Tokens')(sequelize, Sequelize.DataTypes);
const Posts = require('./Posts')(sequelize, Sequelize.DataTypes);

module.exports = { Users, Tokens, Posts };

const LikesPosts = require('./LikesPosts')(sequelize, Sequelize.DataTypes);

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
    const post = await Posts.findAll({
      include: ['likes', 'ownerUser'],
    });
    console.log(post);
  } catch (error) {
    console.error('Не удается подключиться к базе данных:', error);
  }
})();
