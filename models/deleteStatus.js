module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DeleteStatus', {
    deleteStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'DELETE_STATUS',
    timestamps: false,
  })
}