module.exports = app => {
  const users = require("../controllers/auth.controller");
  const { verifyToken } = require('../services/authJwt.service');

  let router = require("express").Router();

  // Get user by ID
  router.get('/users/:id', verifyToken, users.getUserById);

  app.use("/api", router);
};
