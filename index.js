require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/router');

const helmetConfig = require('./config/helmetConfig');
const rateLimiter = require('./config/rateLimitConfig');

helmetConfig(app);
rateLimiter(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

router.setupRouter(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
