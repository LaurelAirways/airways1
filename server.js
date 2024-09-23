// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Your MySQL username
    password: '12345',  // Your MySQL password
    database: 'airline_booking'  // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve the HTML file (book_flight.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/book_flight.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { from, to, departure_date, return_date, passengers } = req.body;

    // SQL query to insert form data into the database
    const sql = 'INSERT INTO bookings (from_city, to_city, departure_date, return_date, passengers) VALUES (?, ?, ?, ?, ?)';
    const values = [from, to, departure_date, return_date, passengers];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error inserting data into MySQL:', err);
            return res.send('Error occurred while booking the flight.');
        }
        res.send('Flight booking successful!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
