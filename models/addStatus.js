module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ADDSTATUS_TB', {
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