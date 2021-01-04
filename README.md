# 🌜 서비스 한줄 소개 🌟

- ### '속'상하기 쉬운 모두를 위한 카페 위치 제공 서비스, 밀키웨이
- ### 서비스가 궁금하다구요? [Click!](https://www.notion.so/MILKY-s_-ce4054f1e58f4a13ae9993b4ed9a28df)

<br>

# ✔ 밀키웨이의 꺼지지 않는 서버 ✔

- [코드 컨벤션](https://www.notion.so/coding-convention-30c0d782d6514786b9614a923023a609)
- [커밋 컨벤션](https://www.notion.so/commit-convention-4fe2f1344a444f838baeae80796fd795)

<br>

# 🌌 서비스 명 🌌

- ### `Milky Way`

![밀키웨이 로고](https://user-images.githubusercontent.com/68318945/103261167-cc5d4300-49e3-11eb-9fee-278ae7f086a1.png)

<br>

## `models/index.js`

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
db.menu.belongsToMany(db.category, { through: 'MENU_CATEGORY', as: 'hasMenu', foreignKey: 'menuId' });
db.category.belongsToMany(db.menu, { through: 'MENU_CATEGORY', as: 'hasCategory', foreignKey: 'categoryId' });

/** N : M Cafe : HoneyTip */
db.cafe.belongsToMany(db.honeyTip, { through: 'CAFE_HONEYTIP', as: 'hasCafe', foreignKey: 'cafeId' });
db.honeyTip.belongsToMany(db.cafe, { through: 'CAFE_HONEYTIP', as: 'hasHoneyTip', foreignKey: 'honeyTipId' });

/** 1 : N  rejectReason : addManage */
db.rejectReason.hasMany(db.addManage, { onDelete: 'cascade', foreignKey: 'rejectReasonId', sourceKey: 'rejectReasonId', });
db.addManage.belongsTo(db.rejectReason, { foreignKey: 'rejectReasonId', targetKey: 'rejectReasonId', });
```

<br>

## `ERD(Entity Relation Diagram)`
![ERD](https://user-images.githubusercontent.com/68318945/103414991-9bd3ff80-4bc3-11eb-9b58-9c3106734752.png)


<br>

## `MilkieServer`

- ### [최다인](https://github.com/Chedda98)
- ### [신지혜](https://github.com/NewWisdom)
