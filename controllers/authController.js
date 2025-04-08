const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.send("User registered");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({
      message: 'User profile fetched successfully',
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).json({
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
