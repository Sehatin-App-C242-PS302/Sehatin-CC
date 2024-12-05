const { Prediction } = require('../models');
const { USER_NOT_AUTHORIZED, PREDICTIONS_NOT_FOUND } = require('../constants/messages');

module.exports = {
  async getPredictionsByUserId(req, res) {
    const { userId } = req; // userId dari middleware JWT
    const { user_id } = req.params;

    console.log('User ID from JWT:', userId);
    console.log('Requested User ID from Params:', user_id);

    // Validasi apakah user ID dari token sesuai dengan user ID dari parameter
    if (parseInt(userId) !== parseInt(user_id)) {
      console.error('Unauthorized access attempt. JWT userId does not match requested user_id.');
      return res.status(403).json({
        success: false,
        message: USER_NOT_AUTHORIZED,
      });
    }

    try {
      // Fetch predictions berdasarkan user_id
      const predictions = await Prediction.findAll({
        where: { user_id },
        attributes: ['user_id', 'gender', 'age', 'height', 'weight', 'bmi', 'recommended_steps', 'created_at'],
      });

      console.log('Fetched Predictions:', predictions);

      // Jika tidak ada data, kembalikan status 404
      if (!predictions || predictions.length === 0) {
        console.error('No predictions found for the requested user ID');
        return res.status(404).json({
          success: false,
          message: PREDICTIONS_NOT_FOUND,
        });
      }

      // Kembalikan data predictions jika ditemukan
      res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error('Error fetching predictions:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },
};
