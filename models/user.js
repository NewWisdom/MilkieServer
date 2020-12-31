module.exports = (sequelize, DataTypes) => {
  return sequelize.define('USER', {
    nickName: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}