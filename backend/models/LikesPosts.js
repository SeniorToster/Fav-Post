const { DataTypes, sequelize } = require('.');
const Posts = require('./Posts');
const Users = require('./Users');

const LikesPosts = sequelize.define(
  'likes_posts',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Posts,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = LikesPosts;
