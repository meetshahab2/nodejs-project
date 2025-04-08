const authRoutes = require('./authRoutes');
const helpers = require('../utils/helpers');

function setupRouter(app) {
  try {
    app.use('/api/auth', authRoutes);
  }catch (e) {
          return helpers.redirectTo404();
  }
}

module.exports.setupRouter = setupRouter;