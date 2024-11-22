const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../utils/jwtUtils');
const { USER_NOT_FOUND, INVALID_PASSWORD } = require('../constants/messages');

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashedPassword });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(INVALID_PASSWORD);
  }

  const token = generateToken(user.id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
