const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cafe = require('./cafe')(sequelize, Sequelize);
db.menu = require('./menu')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);
db.universe = require('./universe')(sequelize, Sequelize);
db.option = require('./option')(sequelize, Sequelize);
db.editStatus = require('./editStatus')(sequelize, Sequelize);
db.addStatus = require('./addStatus')(sequelize, Sequelize);
db.deleteStatus = require('./deleteStatus')(sequelize, Sequelize);

/** 1 : N  Cafe : Menu */
db.cafe.hasMany(db.menu, { onDelete: 'cascade', foreignKey: 'cafeId', sourceKey: 'id', });
db.menu.belongsTo(db.cafe, { foreignKey: 'cafeId', targetKey: 'id', });

/** 1 : N  Cafe : Option */
db.cafe.hasMany(db.option, { onDelete: 'cascade', foreignKey: 'cafeId', sourceKey: 'id', });
db.option.belongsTo(db.cafe, { foreignKey: 'cafeId', targetKey: 'id', });

/** N : M  User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'Universe', as: 'Universed', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'Universe', as: 'Universer', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'EditStatus', as: 'Edited', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'EditStatus', as: 'Editor', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'DeleteStatus', as: 'Deleted', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'DeleteStatus', as: 'Deleter', foreignKey: 'cafeId' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'ADD_STATUS', as: 'Added', foreignKey: 'userId' });
db.cafe.belongsToMany(db.user, { through: 'ADD_STATUS', as: 'Adder', foreignKey: 'cafeId' });

/** N : M Menu : Category */
db.menu.belongsToMany(db.category, { through: 'MENU_CATEGORY', as: 'hasMenu', foreignKey: 'menuId' });
db.category.belongsToMany(db.menu, { through: 'MENU_CATEGORY', as: 'hasCategory', foreignKey: 'categoryId' });

module.exports = db;