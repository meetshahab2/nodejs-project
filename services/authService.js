const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../config/db'); 

function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '15d' }
  );

  return { accessToken, refreshToken };
}

async function saveTokens(userId, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry) {
  await knex('user_tokens')
    .insert({
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
      access_expires_at: accessTokenExpiry,
      refresh_expires_at: refreshTokenExpiry
    })
    .onConflict('user_id') // needs UNIQUE constraint on user_id
    .merge({
      access_token: accessToken,
      refresh_token: refreshToken,
      access_expires_at: accessTokenExpiry,
      refresh_expires_at: refreshTokenExpiry,
      updated_at: knex.fn.now()
    });
}

exports.register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await userRepository.createUser({ ...userData, password: hashedPassword });

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    success: true,
    status: 201,
    data: {
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email } 
    }
  };
};

exports.getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error('User not found');
  const { password, ...safeUser } = user;
  return safeUser;
};

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const { accessToken, refreshToken } = generateTokens(user);

  const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  await saveTokens(user.id, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry); // 👈 ab call ho raha hai

  return {
    accessToken,
    refreshToken,
    accessTokenExpiry,
    user: { id: user.id, name: user.name, email: user.email }
  };
};

exports.refreshAccessToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return reject(new Error('Invalid refresh token'));

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      resolve(newAccessToken);
    });
  });
};