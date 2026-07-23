const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === '23505') {   
      return res.status(409).json({ message: "Email already registered" });
    }

    res.status(400).json({ message: "Registration failed. Please check your details." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { accessToken, refreshToken, accessTokenExpiry, user } = await authService.login(email, password);

    const now = new Date();
    const expiresIn = Math.floor((new Date(accessTokenExpiry) - now) / 1000);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      accessTokenExpiry,
      expiresIn,
      user
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    const newAccessToken = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
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
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};