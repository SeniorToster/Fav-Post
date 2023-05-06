const { DataTypes, sequelize } = require('.');

const Posts = sequelize.define(
  'posts',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_At: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    owner_post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Posts;
