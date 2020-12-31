module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OPTION', {
    option: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}