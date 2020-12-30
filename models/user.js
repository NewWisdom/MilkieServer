module.exports = (sequelize, DataTypes) => {
  return sequelize.define('USER_TB', {
    nickName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}