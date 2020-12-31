module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DELETESTATUS_TB', {
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
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}