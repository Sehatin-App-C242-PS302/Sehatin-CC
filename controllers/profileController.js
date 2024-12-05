const { User } = require('../models');

module.exports = {
  async getProfile(req, res) {
    const { userId } = req;
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  async updateProfile(req, res) {
    const { userId } = req;
    const { name, email } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();

      res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};
