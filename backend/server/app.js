require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Import connection to database
const connection = require('../utils/database');

app.use(cors());
app.use(express.json());

app.route('/users').get((req, res) => {
    connection.query(
        "SELECT * FROM `Users`",
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

// need to change so it checks authorization of resource
app.route('/private').get((req, res) => {
    connection.query(
        "SELECT * FROM `Users` WHERE email=?", [req.body.email], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

// POST Request to signup
app.route('/signup').post((req, res) => {
    // Query to find an existing user with the same email
    console.log("signing up");
    connection.query("SELECT * FROM `Users` WHERE email=?", [req.body.email], (error, results, fields) => {
        if (error) {
            console.log("1");
            return res.status(500).json({ success: false, message: "Error querying database finding email!" });
        };
        
        // If the results array has more than one result, then there is an existing user
        if (results.length > 0) {
            console.log("2");
            return res.status(200).json({ success: false, message: "That email is already associated with an account!" });
        }

        // Otherwise, add the new user to database
        connection.query(
            "INSERT INTO `Users` (username, email, password, confirmpassword) VALUES (?, ?, ?, ?)",
            [req.body.username, req.body.email, req.body.password, req.body.confirmpassword],
            (error, results, fields) => {
                if (error) {
                    console.log("3");
                    return res.status(500).json({ success: false, message: error });
                };
                console.log("4");
                return res.status(200).json({ success: true, message: "Successfully logged in!"});
            }
        );

    });
})

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
