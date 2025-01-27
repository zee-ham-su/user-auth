const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const OrganisationModel = require('./organisation');
const dbConfig = require("../db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

console.log('Connection has been established successfully.')
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
