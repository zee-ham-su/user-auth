const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/db.config");
const { Sequelize } = require("sequelize");
require('dotenv').config();
const db = require("./src/models/index");


const app = express();

// Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Test DB connection
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database connected and tables created.');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./src/routes/auth.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
