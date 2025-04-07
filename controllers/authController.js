const authService = require('../services/authService');

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  res.status(result.status).json(result.data);
};
