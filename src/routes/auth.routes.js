module.exports = app => {
  const auth = require("../controllers/auth.controller");
  const { verifyToken } = require('../services/authJwt.service');

  let router = require("express").Router();

  // User registration
  router.post("/register", auth.register);

  // User login
  router.post("/login", auth.login);

  // get user profile by id
  router.get('/users/:id', verifyToken, users.getUserById);

  app.use("/auth", router);
};
