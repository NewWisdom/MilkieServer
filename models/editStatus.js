module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EDIT_STATUS', {
    reason: {
      type: DataTypes.TEXT(),
      allowNull: false
    }
  }, {
    freezeTableName: false,
    timestamps: false,
  })
}