const db = require('../config/db');

const createUser = async (user) => {
  const [id] = await db('users').insert({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  return { id, name: user.name, email: user.email };
};

const findByEmail = async (email) => {
  return await db('users').where({ email }).first();
};

const findUserById = async (id) => {
  return await db('users').select('id', 'name', 'email').where({ id }).first();
};

const saveTokens = async (userId, accessToken, refreshToken, accessExpiry, refreshExpiry) => {
  await db('user_tokens')
    .insert({
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
      access_expires_at: accessExpiry,
      refresh_expires_at: refreshExpiry,
    })
    .onConflict('user_id')
    .merge([
      'access_token',
      'refresh_token',
      'access_expires_at',
      'refresh_expires_at',
    ]);
};

module.exports = {
  createUser,
  findUserById,
  findByEmail,
  saveTokens,
};
