const db = require('../config/db');

const createUser = async (user) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [user.name, user.email, user.password];
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve({
        id: result.insertId,
        name: user.name,
        email: user.email
      });
    });
  });
};

const findByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

module.exports = {
  createUser,
  findByEmail
};
