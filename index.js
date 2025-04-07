require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./auth/authRoutes');

console.log(authRoutes);

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
