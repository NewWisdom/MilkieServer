module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EditStatus', {
    editStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: DataTypes.TEXT(),
      allowNull: false
    }
  }, {
    tableName: 'EDIT_STATUS',
    timestamps: false,
  })
}