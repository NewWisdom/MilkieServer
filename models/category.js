module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CATEGORY_TB', {
    categoryName: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}