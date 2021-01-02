module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HONEYTIP', {
    option: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}