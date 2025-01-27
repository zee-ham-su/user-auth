const express = require('express');
const router = express.Router();
const { getUserById } = require('../controller/userController');
const verifyToken = require('../middleware/authjwt');

router.get('/:id', verifyToken, getUserById);

module.exports = router;
