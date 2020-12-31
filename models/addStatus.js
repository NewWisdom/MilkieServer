module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ADD_STATUS', {
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    confirmStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}