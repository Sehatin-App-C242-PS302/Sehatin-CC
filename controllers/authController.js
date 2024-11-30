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
        data: { user } 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
      next(error); // optional, jika ingin menggunakan middleware error handling
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUser(email, password);
      res.status(200).json({ 
        success: true, 
        message: LOGIN_SUCCESS, 
        data: { token, user } 
      });
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: error.message 
      });
      next(error); // optional, jika ingin menggunakan middleware error handling
    }
  },
};


// const { registerUser, loginUser } = require('../services/authService');
// const { REGISTER_SUCCESS, LOGIN_SUCCESS } = require('../constants/messages');

// module.exports = {
//   async register(req, res, next) {
//     try {
//       const { name, email, password } = req.body;
//       const user = await registerUser(name, email, password);
//       res.status(201).json({ message: REGISTER_SUCCESS, user });
//     } catch (error) {
//       next(error);
//     }
//   },

//   async login(req, res, next) {
//     try {
//       const { email, password } = req.body;
//       const { user, token } = await loginUser(email, password);
//       res.status(200).json({ message: LOGIN_SUCCESS, token, user });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
