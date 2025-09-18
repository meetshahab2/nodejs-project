const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const helpers = require('../utils/helpers');

function setupRouter(app) {
  try {
    app.use('/api/auth', authRoutes);
    app.use('/api/category', categoryRoutes);

  }catch (e) {
          return helpers.redirectTo404();
  }
}

module.exports.setupRouter = setupRouter;