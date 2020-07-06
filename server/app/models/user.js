import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: {
          args: [2, 200],
          msg: 'Name must be between 2 and 200 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: 'uniqueUserEmail',
      validate: {
        isEmail: true,
        len: {
          args: [2, 100],
          msg: 'Email must be between 2 and 200 characters long',
        },
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [6, 16],
          msg: 'Password need to have at least 6 characters and maximum of 16 characters',
        },
      },
    },
    thirdPartyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.afterValidate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPassword;
  });

  User.associate = (models) => {
    models.User.hasMany(models.Tag, {
      as: 'tagPool',
      foreignKey: {
        name: 'ownerId',
        allowNull: false,
      },
    });
  };
  return User;
};
