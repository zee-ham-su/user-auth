const { DataTypes } = require('sequelize');

const Organisation = (sequelize) => {
  const OrganisationModel = sequelize.define('Organization', {
    orgId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return OrganisationModel;
};

module.exports = Organisation;
