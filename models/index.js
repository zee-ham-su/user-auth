const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const OrganisationModel = require('./organisation');
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
const Organisation = OrganisationModel(sequelize);

User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });

module.exports = {
  sequelize,
  models: {
    User,
    Organisation,
  },
};
