const { Nutrition } = require('../models');

module.exports = {
  async getUserNutritions(req, res) {
    const { userId } = req;

    try {
      // Fetch data dari tabel `nutritions` berdasarkan userId
      const nutritions = await Nutrition.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']],
      });

      res.status(200).json({ success: true, data: nutritions });
    } catch (error) {
      console.error('Error fetching nutritions:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};
