module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MENU', {
    menuName: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    option: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}