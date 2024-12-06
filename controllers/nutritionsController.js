const db = require('../database'); // Koneksi database Anda

module.exports = {
  async getPredictions(req, res) {
    const { userId } = req;

    try {
      const query = `
        SELECT id, user_id, image_url, predicted_class, calories, protein, fat, carbohydrates, created_at
        FROM nutritions
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;
      const [results] = await db.execute(query, [userId]);

      if (!results || results.length === 0) {
        return res.status(404).json({ success: false, message: 'No predictions found for this user.' });
      }

      res.status(200).json({ success: true, data: results });
    } catch (error) {
      console.error('Error fetching predictions:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};
