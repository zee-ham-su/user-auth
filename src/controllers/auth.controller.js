const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/jwt.config");

// Register a new user
exports.register = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    return res.status(422).json({
      errors: [
        { field: "firstName", message: "First name is required" },
        { field: "lastName", message: "Last name is required" },
        { field: "email", message: "Email is required" },
        { field: "password", message: "Password is required" }
      ]
    });
  }

  // Create a User
  const user = {
    userId: `USER_${Math.random().toString(36).substr(2, 9)}`, // Generate unique user ID
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      // Create default organisation
      const organisation = {
        orgId: `ORG_${Math.random().toString(36).substr(2, 9)}`, // Generate unique org ID
        name: `${user.firstName}'s Organisation`,
        description: "Default organisation"
      };

      // Save Organisation in the database
      db.organisations.create(organisation)
        .then(() => {
          const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
            expiresIn: "24h"
          });

          res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
              accessToken: token,
              user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
              }
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            status: "error",
            message: err.message || "Some error occurred while creating the organisation."
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

// Login a user
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Authentication failed. User not found."
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({
          status: "error",
          message: "Authentication failed. Invalid password."
        });
      }

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: "24h"
      });

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while logging in."
      });
    });
  }
    // Get user record
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findOne({
    where: { userId: userId },
    attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'],
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found.',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'User record fetched successfully',
        data: user,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err.message || 'Some error occurred while fetching the user record.',
      });
    });
};
