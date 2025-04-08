const authService = require('../services/authService');


console.log(exports);

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.send("User registered");
  } catch (error) {
    res.status(500).send(error.message);
  }
};