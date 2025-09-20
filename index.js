require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');
const helmetConfig = require('./config/helmetConfig');

helmetConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.setupRouter(app);

console.log(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
