const express = require('express');
const router = express.Router();
const { getOrganisations, getOrganisation, createOrganisation, addUserToOrganisation } = require('../controller/orgController');
const verifyToken = require('../middleware/authjwt');

router.get('/', verifyToken, getOrganisations);
router.get('/:orgId', verifyToken, getOrganisation);
router.post('/', verifyToken, createOrganisation);
router.post('/:orgId/users', verifyToken, addUserToOrganisation);

module.exports = router;
