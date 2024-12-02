const { registerUser, loginUser } = require('../services/authService');
const { REGISTER_SUCCESS, LOGIN_SUCCESS } = require('../constants/messages');

module.exports = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await registerUser(name, email, password);
      res.status(201).json({ 
        success: true, 
        message: REGISTER_SUCCESS, 
        user // langsung menyertakan user di bawah message
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
      next(error); // optional
    }
  },

  async login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    // Ambil data "bersih" dari instance user
    const userData = user.get();

    // Tambahkan token ke dalam data user
    userData.token = token;

    res.status(200).json({
      success: true,
      message: LOGIN_SUCCESS,
      user: {
        dataValues: userData, // Kembali ke struktur sebelumnya
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
    next(error);
  }
}
}

  