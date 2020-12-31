module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DELETE_STATUS', {
    reason: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}