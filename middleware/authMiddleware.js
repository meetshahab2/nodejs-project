const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const accessToken = authHeader && authHeader.split(' ')[1];
const refreshToken = req.headers['x-refresh-token'];

  if (!accessToken) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {

        if (!refreshToken) {
          return res.status(403).json({ message: 'Refresh token required' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (refreshErr, refreshUser) => {
          if (refreshErr) return res.status(403).json({ message: 'Invalid refresh token' });

          const newAccessToken = jwt.sign(
            { id: refreshUser.id, email: refreshUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
          );

          res.setHeader('x-access-token', newAccessToken);

          req.user = refreshUser;
          next();
        });
      } else {
        return res.status(403).json({ message: 'Invalid access token' });
      }
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateToken;
