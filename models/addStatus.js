module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AddStatus', {
    addStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    confirmStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ADD_STATUS',
    timestamps: false,
  })
}