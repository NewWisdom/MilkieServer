# 🥛 Milky Way
#### '속'상하기 쉬운 모두를 위한 카페 위치 제공 서비스, 밀키웨이  

![image](https://user-images.githubusercontent.com/43840561/103670502-fe127300-4fbc-11eb-94bd-11b17fac2373.png)

## 👑  MilkieServer
######  Milkies Lover, Milkies Server . . .✨
|               [신지혜](https://github.com/NewWisdom)                |        [최다인](https://github.com/Chedda98)              |
| :----------------------------------------------------------: | :----------------------------------------------------------: | 
| <img src="https://user-images.githubusercontent.com/43840561/103657850-c3550e80-4fad-11eb-91ea-6f1926d49a34.png" height="300" /> | <img src="https://user-images.githubusercontent.com/68318945/104224837-da51a000-5488-11eb-8983-b45ad51d6403.jpg" height="300" /> | 


<br>


## ❗️ Convention

- [코드 컨벤션](https://www.notion.so/commit-convention-4fe2f1344a444f838baeae80796fd795)
- [커밋 컨벤션](https://www.notion.so/coding-convention-30c0d782d6514786b9614a923023a609)


<br>



## 📖 API 명세서
### [WIKI](https://github.com/MilkyOnOurWay/MilkieServer/wiki)


<br>



## 🔎 핵심 기능 
|       기능       |          상세 기능          | 역할 | 진척도 |
| :--------------: | :-----------------------: | :---: | :----: |
|     회원가입     |         닉네임 입력         | 다인 |    🔄       |
|                  |       로그인 기능       | 다인 |     🔄      |
|    홈 탭          |    내 주위 카페 불러오기      | 다인 |      🔄     |
|                  |     카테고리별 카페 불러오기     | 다인 |     🔄      |
| 카페 상세 페이지 |       카페 상세 정보 불러오기        | 지혜 |    🔄       |
|     제보하기     |          카페 정보 수정 요청           | 지혜 |    🔄       |
|                  |      카페 정보 삭제 요청       | 지혜 |      🔄     |
|                  |       카페 제보하기         | 지혜 |     🔄      |
|   나의 제보 탭        |     내가 제보한 카페 불러오기     | 지혜 |       🔄    |
|                  |   내가 제보한 카페 거절 이유 불러오기   | 지혜 |     🔄      |
|               |     제보한 카페 거절 후 삭제      | 지혜 |     🔄      |
|       유니버스       |        마이 유니버스 추가        | 다인 |     🔄      |
|                  |    마이 유니버스 삭제     | 다인 |      🔄     |
|                 |         내 주위 마이 유니버스 불러오기         | 다인 |      🔄     |
|       설정       |         닉네임 변경          | 다인 |     🔄      |


<br>

## 🚀 Architecture
<img src="https://user-images.githubusercontent.com/43840561/104095511-8c973500-52da-11eb-9cea-e8e77deb35f5.png" width="1000" />



<br>



## ⛓ Model

```javascript
db.cafe = require('./cafe')(sequelize, Sequelize);
db.menu = require('./menu')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);
db.universe = require('./universe')(sequelize, Sequelize);
db.honeyTip = require('./honeyTip')(sequelize, Sequelize);
db.editManage = require('./editManage')(sequelize, Sequelize);
db.addManage = require('./addManage')(sequelize, Sequelize);
db.deleteManage = require('./deleteManage')(sequelize, Sequelize);
db.rejectReason = require('./rejectReason')(sequelize, Sequelize);
db.cafeHoneyTip = require('./cafeHoneyTip')(sequelize, Sequelize);
db.menuCategory = require('./menuCategory')(sequelize, Sequelize);

/** 1 : N  Cafe : Menu */
db.cafe.hasMany(db.menu, { onDelete: 'cascade', foreignKey: 'cafeId', sourceKey: 'id', });
db.menu.belongsTo(db.cafe, { foreignKey: 'cafeId', targetKey: 'id', });

/** N : M  User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'Universe', as: 'Universed', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'Universe', as: 'Universer', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'EditManage', as: 'Edited', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'EditManage', as: 'Editor', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'DeleteManage', as: 'Deleted', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'DeleteManage', as: 'Deleter', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'AddManage', as: 'Added', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'AddManage', as: 'Adder', foreignKey: 'cafeId' });

/** N : M Menu : Category */
db.menu.belongsToMany(db.category, { through: 'menuCategory', as: 'hasMenu', foreignKey: 'menuId' });
db.category.belongsToMany(db.menu, { through: 'menuCategory', as: 'hasCategory', foreignKey: 'categoryId' });

/** N : M Cafe : HoneyTip */
db.cafe.belongsToMany(db.honeyTip, { through: 'cafeHoneyTip', as: 'hasCafe', foreignKey: 'cafeId' });
db.honeyTip.belongsToMany(db.cafe, { through: 'cafeHoneyTip', as: 'hasHoneyTip', foreignKey: 'honeyTipId' });

/** 1 : N  rejectReason : addManage */
db.rejectReason.hasMany(db.addManage, { onDelete: 'cascade', foreignKey: 'rejectReasonId', sourceKey: 'rejectReasonId', });
db.addManage.belongsTo(db.rejectReason, { foreignKey: 'rejectReasonId', targetKey: 'rejectReasonId', });
```

<br>


## ☠️ ERD(Entity Relation Diagram)
<img src="https://user-images.githubusercontent.com/43840561/103655316-67d55180-4faa-11eb-9be7-50e121639e14.png" width="800" />
<br>

## 🔗 Dependecy
```json
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "mysql2": "^2.2.5",
    "request": "^2.88.2",
    "request-promise": "^4.2.6",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
  }
 ```


