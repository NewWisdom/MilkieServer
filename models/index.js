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

/** 1 : N  User : Cafe */
db.user.hasMany(db.cafe, { onDelete: 'cascade' });
db.cafe.belongsTo(db.user, { onDelete: 'cascade' });

module.exports = db;