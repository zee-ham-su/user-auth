const db = require("../models");
const Organisation = db.organisations;

// Create a new organisation
exports.createOrganisation = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(422).json({
      errors: [
        { field: "name", message: "Organisation name is required" }
      ]
    });
  }

  // Create Organisation
  const organisation = {
    orgId: `ORG_${Math.random().toString(36).substr(2, 9)}`, // Generate unique org ID
    name: req.body.name,
    description: req.body.description
  };

  // Save Organisation in the database
  Organisation.create(organisation)
    .then(data => {
      res.status(201).json({
        status: "success",
        message: "Organisation created successfully",
        data: {
          orgId: organisation.orgId,
          name: organisation.name,
          description: organisation.description
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while creating the organisation."
      });
    });
};

// Fetch all organisations
exports.getAllOrganisations = (req, res) => {
  Organisation.findAll()
    .then(organisations => {
      res.status(200).json({
        status: "success",
        message: "Retrieved all organisations",
        data: {
          organisations: organisations
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while retrieving organisations."
      });
    });
};

// Fetch a single organisation by ID
exports.getOrganisationById = (req, res) => {
  const orgId = req.params.orgId;

  Organisation.findByPk(orgId)
    .then(organisation => {
      if (!organisation) {
        return res.status(404).json({
          status: "error",
          message: `Organisation with id ${orgId} not found.`
        });
      }

      res.status(200).json({
        status: "success",
        message: `Retrieved organisation with id ${orgId}`,
        data: organisation
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || `Error retrieving organisation with id ${orgId}`
      });
    });
};

// Add a user to an organisation
exports.addUserToOrganisation = (req, res) => {
  const { userId } = req.body;
  const orgId = req.params.orgId;

  // Find organisation
  Organisation.findByPk(orgId)
    .then(organisation => {
      if (!organisation) {
        return res.status(404).json({
          status: "error",
          message: `Organisation with id ${orgId} not found.`
        });
      }

      // Add user to organisation (assuming association is properly set up)
      organisation.addUser(userId)
        .then(() => {
          res.status(200).json({
            status: "success",
            message: `User added to organisation ${orgId} successfully`
          });
        })
        .catch(err => {
          res.status(500).json({
            status: "error",
            message: err.message || `Error adding user to organisation ${orgId}`
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || `Error retrieving organisation with id ${orgId}`
      });
    });
};
