const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.organisations = require("./organisation.model.js")(sequelize, Sequelize);

// Associations
db.users.belongsToMany(db.organisations, { through: 'UserOrganisation' });
db.organisations.belongsToMany(db.users, { through: 'UserOrganisation' });

module.exports = db;
