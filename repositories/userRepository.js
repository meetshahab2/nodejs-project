const db = require('../config/db');

exports.createUser = async (user) => {
  // use db connection or ORM
  // Example placeholder
  return {
    id: 1,
    name: user.name,
    email: user.email
  };
};
