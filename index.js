require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
router.setupRouter(app);

console.log(router);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
