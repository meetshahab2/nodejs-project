const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) {
          return res.status(403).json({ message: 'Refresh token required' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (refreshErr, refreshUser) => {
          if (refreshErr) return res.status(403).json({ message: 'Invalid refresh token' });

          try {
            const tokenRecord = await userRepository.findRefreshToken(refreshUser.id, refreshToken);
            if (!tokenRecord) {
              return res.status(403).json({ message: 'Refresh token has been revoked' });
            }
            if (new Date(tokenRecord.refresh_expires_at) < new Date()) {
              return res.status(403).json({ message: 'Refresh token expired' });
            }

            const newAccessToken = jwt.sign(
              { id: refreshUser.id, email: refreshUser.email },
              process.env.JWT_SECRET,
              { expiresIn: '15m' }
            );

            res.setHeader('x-access-token', newAccessToken);
            req.user = refreshUser;
            next();
          } catch (dbErr) {
            console.error('Refresh token DB check failed:', dbErr);
            return res.status(500).json({ message: 'Something went wrong' });
          }
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