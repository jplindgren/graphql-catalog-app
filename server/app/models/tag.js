module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        unique: 'uniqueTag',
        allowNull: false,
        validate: {
          len: {
            args: [2, 20],
            msg: 'A tag must be between 2 and 20 characters long',
          },
        },
      },
    },
    { timestamps: false }
  );

  Tag.associate = (models) => {
    models.Tag.belongsToMany(models.Item, {
      as: 'items',
      through: 'Item_Tags',
      onDelete: 'NO ACTION',
    });
  };
  return Tag;
};
