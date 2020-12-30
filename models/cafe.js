module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CAFE_TB', {
    cafeName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cafeAddress: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    businessHours: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cafePhoneNum: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cafeMoreInfo: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}