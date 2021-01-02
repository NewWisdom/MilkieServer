module.exports = (sequelize, DataTypes) => {
  return sequelize.define('RejectReason', {
    rejectReasonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rejectReason: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'REJECT_REASON',
    timestamps: false,
  })
}