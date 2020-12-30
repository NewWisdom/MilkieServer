module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MENU_TB', {
    menu: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}