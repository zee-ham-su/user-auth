const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const OrganizationModel = require('./organization');
const dbConfig = require("../db.config.js");

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

const User = UserModel(sequelize);
const Organization = OrganizationModel(sequelize);

User.belongsToMany(Organization, { through: 'UserOrganizations' });
Organization.belongsToMany(User, { through: 'UserOrganizations' });

module.exports = {
  sequelize,
  models: {
    User,
    Organization,
  },
};
