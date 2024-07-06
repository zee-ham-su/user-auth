module.exports = (sequelize, Sequelize) => {
  const Organisation = sequelize.define("organisations", {
    orgId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Organisation;
};
