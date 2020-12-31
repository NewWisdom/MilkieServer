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

/** 1 : N  Cafe : Menu */
db.cafe.hasMany(db.menu, { onDelete: 'cascade' });
db.menu.belongsTo(db.cafe, { onDelete: 'cascade' });

/** N : M  User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'UNIVERSE', as: 'Universed' });
db.cafe.belongsToMany(db.user, { through: 'UNIVERSE', as: 'Universer' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'EDIT_STATUS', as: 'Edited' });
db.cafe.belongsToMany(db.user, { through: 'EDIT_STATUS', as: 'Editor' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'DELETE_STATUS', as: 'Deleted' });
db.cafe.belongsToMany(db.user, { through: 'DELETE_STATUS', as: 'Deleter' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'ADD_STATUS', as: 'Added' });
db.cafe.belongsToMany(db.user, { through: 'ADD_STATUS', as: 'Adder' });

/** N : M Menu : Category */
db.menu.belongsToMany(db.cafe, { through: 'MENU_CATEGORY', as: 'hasMenu' });
db.category.belongsToMany(db.user, { through: 'MENU_CATEGORY', as: 'hasCategory' });

module.exports = db;