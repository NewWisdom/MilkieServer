module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EDITSTATUS_TB', {
    userId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    cafeId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'cafe',
        key: 'id',
      },
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT(),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}