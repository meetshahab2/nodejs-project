const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await userRepository.createUser({ ...userData, password: hashedPassword });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return {
    status: 201,
    data: { token, user }
  };
};

exports.getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};


exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};