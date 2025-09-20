const helmet = require('helmet');

function helmetConfig(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          imgSrc: ["'self'", "data:"],
        },
      },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      noSniff: true,
    })
  );
}

module.exports = helmetConfig;
