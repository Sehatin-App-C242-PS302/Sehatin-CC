const { Prediction } = require('../models');
const { USER_NOT_AUTHORIZED, PREDICTIONS_NOT_FOUND } = require('../constants/messages');

module.exports = {
  async getPredictionsByUserId(req, res) {
    const { userId } = req; // userId diambil dari middleware JWT
    const { user_id } = req.params;

    // Periksa apakah user_id dari token cocok dengan user_id yang diminta
    if (parseInt(userId) !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: USER_NOT_AUTHORIZED,
      });
    }

    try {
      const predictions = await Prediction.findAll({
        where: { user_id },
        attributes: ['user_id', 'gender', 'age', 'height', 'weight', 'bmi', 'recommended_steps', 'created_at'],
      });

      if (predictions.length === 0) {
        return res.status(404).json({
          success: false,
          message: PREDICTIONS_NOT_FOUND,
        });
      }

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
