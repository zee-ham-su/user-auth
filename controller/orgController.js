const { Organisation, User } = require('../models');

async function getOrganisations(req, res) {
  try {
    const user = await User.findByPk(req.user.userId);
    const organisations = await user.getOrganisations();

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations: organisations.map(org => ({
          orgId: org.orgId,
          name: org.name,
          description: org.description,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

async function getOrganisation(req, res) {
  try {
    const user = await User.findByPk(req.user.userId);
    const organisation = await Organisation.findByPk(req.params.orgId);

    if (!organization || !(await user.hasOrganisation(organisation))) {
      return res.status(404).json({
        status: 'error',
        message: 'Organisation not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

async function createOrganisation(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(422).json({
        errors: [{ field: 'name', message: 'Name is required' }],
      });
    }

    const organisation = await Organisation.create({ name, description });
    const user = await User.findByPk(req.user.userId);
    await user.addOrganisation(organisation);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 400,
    });
  }
}

async function addUserToOrganisation(req, res) {
  try {
    const { userId } = req.body;
    const organisation = await Organisation.findByPk(req.params.orgId);
    const user = await User.findByPk(userId);

    if (!organization || !user) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization or user not found',
      });
    }

    await organisation.addUser(user);

    res.status(200).json({
      status: 'success',
      message: 'User added to organization successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 400,
    });
  }
}

module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation,
};
