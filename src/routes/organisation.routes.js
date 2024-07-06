module.exports = app => {
  const organisations = require("../controllers/organisation.controller");

  let router = require("express").Router();

  // Create a new organisation
  router.post("/", organisations.createOrganisation);

  // Get all organisations
  router.get("/", organisations.getAllOrganisations);

  // Get a single organisation by id
  router.get("/:orgId", organisations.getOrganisationById);

  // Add a user to an organisation
  router.post("/:orgId/users", organisations.addUserToOrganisation);

  app.use("/api/organisations", router);
};
