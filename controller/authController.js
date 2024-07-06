const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, organisation } = require('../models');
async function register(req, res) {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    console.log(req.body);

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(422).json({
        errors: [
          { field: 'firstName', message: 'First name is required' },
          { field: 'lastName', message: 'Last name is required' },
          { field: 'email', message: 'Email is required' },
          { field: 'password', message: 'Password is required' },
        ],
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    // Create default organisation
    const organisation = await Organisation.create({
      name: `${firstName}'s Organisation`,
      description: 'Default organisation',
    });
    console.log(organisation);

    // Associate user with organisation
    await user.addorganisation(organisation);

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({
        errors: [{ field: 'email', message: 'Email already exists' }],
      });
    }
    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401,
      });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Authentication failed',
      statusCode: 401,
    });
  }
}

module.exports = {
  register,
  login,
};

