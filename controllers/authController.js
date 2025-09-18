const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, accessTokenExpiry, user } = await authService.login(email, password);

    const now = new Date();
    const expiresIn = Math.floor((new Date(accessTokenExpiry) - now) / 1000); // seconds until expiry

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      accessTokenExpiry,
      expiresIn,  // remaining time in seconds
      user
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    const newAccessToken = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json({
      message: 'User profile fetched successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};
