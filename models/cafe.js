module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CAFE', {
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
      allowNull: true
    },
    cafePhoneNum: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cafeLink: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    cafeMapX: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cafeMapY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cafeType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isReal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}