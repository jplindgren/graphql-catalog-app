module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Name must be between 3 and 100 characters long',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueLink',
      validate: {
        isUrl: {
          args: true,
          msg: 'Invalid link',
        },
      },
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: 'Invalid link preview',
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 5,
          msg: 'Max number of stars is 5',
        },
        min: {
          args: [0],
          msg: 'Min number of stars is 0',
        },
      },
    },
    favorite: {
      type: DataTypes.BOOLEAN,
    },
  });
  Item.associate = (models) => {
    models.Item.belongsTo(models.User, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
        allowNull: false,
      },
    });
    models.Item.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'Item_Tags',
    });
  };
  return Item;
};
