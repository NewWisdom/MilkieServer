module.exports = (sequelize, DataTypes) => {
  return sequelize.define('USER', {
    nickName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}