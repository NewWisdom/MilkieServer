module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CATEGORY', {
    categoryName: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}