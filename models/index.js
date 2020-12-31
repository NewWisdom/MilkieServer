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

/** 1 : N  Cafe : Menu */
db.cafe.hasMany(db.menu, { onDelete: 'cascade' });
db.menu.belongsTo(db.cafe, { onDelete: 'cascade' });

/** N : M  User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'universe', as: 'Universed' });
db.cafe.belongsToMany(db.user, { through: 'universe', as: 'Universer' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'editStatus', as: 'Edited' });
db.cafe.belongsToMany(db.user, { through: 'editStatus', as: 'Editor' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'deleteStatus', as: 'Deleted' });
db.cafe.belongsToMany(db.user, { through: 'deleteStatus', as: 'Deleter' });

/** N : M User : Cafe */
db.user.belongsToMany(db.cafe, { through: 'addStatus', as: 'Added' });
db.cafe.belongsToMany(db.user, { through: 'addStatus', as: 'Adder' });

module.exports = db;