const { User } = require('../models');

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'],
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

module.exports = {
  getUserById,
};
