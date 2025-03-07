const mysql = require('mysql');

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if(err){
    console.error('Error connecting to the database:', err)
  }else{
    console.log('Connected to the database!')
  }
});

module.exports = db;