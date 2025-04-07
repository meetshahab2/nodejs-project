const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const { name, email, password } = userData;

  // Basic validation
  if (!name || !email || !password) {
    return {
      status: 400,
      data: { message: 'Name, email, and password are required.' }
    };
  }

  // Check for existing user
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser.length > 0) {
    return {
      status: 409,
      data: { message: 'Email already registered.' }
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = await userRepository.createUser({ name, email, password: hashedPassword });

  // Generate token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return {
    status: 201,
    data: { message: 'User registered successfully.', token, user }
  };
};
