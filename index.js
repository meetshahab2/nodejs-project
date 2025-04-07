const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // update if you have a MySQL password
  database: 'nodejsproject' // replace with your actual DB name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', connection.threadId);
});

// Express route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Example route to test DB
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
