module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UNIVERSE', {
    
  }, 
  {
    freezeTableName: true,
    timestamps: false,
  })
}