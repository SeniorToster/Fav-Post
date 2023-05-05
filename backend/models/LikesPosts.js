const { Posts, Users } = require('./');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
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
};
