const { DataTypes } = require('sequelize');

const Organization = (sequelize) => {
  const OrganizationModel = sequelize.define('Organization', {
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

  return OrganizationModel;
};

module.exports = Organization;
