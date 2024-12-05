const { Prediction } = require('../models');
const { USER_NOT_AUTHORIZED, PREDICTIONS_NOT_FOUND } = require('../constants/messages');

const predictionsMiddleware = async (req, res, next) => {
  const { userId } = req; // Diambil dari JWT middleware
  const { user_id } = req.params;

  console.log('Middleware: User ID from JWT:', userId);
  console.log('Middleware: Requested User ID from Params:', user_id);

  // Validasi apakah user ID dari token sesuai dengan user ID dari parameter
  if (parseInt(userId) !== parseInt(user_id)) {
    console.error('Unauthorized access attempt in middleware.');
    return res.status(403).json({
      success: false,
      message: USER_NOT_AUTHORIZED,
    });
  }

  // Periksa apakah ada predictions untuk user_id
  try {
    const predictions = await Prediction.findAll({
      where: { user_id },
      attributes: ['user_id'], // Ambil data minimal untuk validasi
    });

    if (!predictions || predictions.length === 0) {
      console.error('No predictions found in middleware for the requested user ID');
      return res.status(404).json({
        success: false,
        message: PREDICTIONS_NOT_FOUND,
      });
    }

    console.log('Middleware: Predictions found for user ID', user_id);

    // Lanjutkan ke handler berikutnya
    next();
  } catch (error) {
    console.error('Middleware: Error fetching predictions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = predictionsMiddleware;
