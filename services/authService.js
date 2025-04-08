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
