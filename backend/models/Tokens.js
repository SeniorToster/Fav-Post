module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'tokens',
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
