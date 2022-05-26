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

app.route('/login').get((req, res) => {
    connection.query("SELECT * FROM `Users` WHERE username=?", [req.body.username], (error, results, fields) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error querying database finding username!" });
        }
        if (results.length === 0) {
            return res.status(200).json({ success: false, message: "Username doesn't exist!" });
        }
        else {
            return res.status(200).json({ success: true, message: "Successfully logged in!", results });
        }
    })

});

// POST Request to signup
app.route('/signup').post((req, res) => {
    // Query to find an existing user with the same email
    console.log("signing up");
    connection.query("SELECT * FROM `Users` WHERE username=?", [req.body.username], (error, results, fields) => {
        if (error) {
            console.log("Error querying database finding username!");
            return res.status(500).json({ success: false, message: "Error querying database finding username!" });
        }
        
        // If the results array has more than one result, then there is an existing user
        if (results.length > 0) {
            console.log("That username is already associated with an account!");
            return res.status(200).json({ success: false, message: "That username is already associated with an account!" });
        }

        // Otherwise, add the new user to database
        connection.query(
            "INSERT INTO `Users` (username, email, password, confirmpassword) VALUES (?, ?, ?, ?)",
            [req.body.username, req.body.email, req.body.password, req.body.confirmpassword],
            (error, results, fields) => {
                if (error) {
                    console.log("Something went wrong with adding a new user.");
                    return res.status(500).json({ success: false, message: error });
                };
                console.log("Successfully logged in!");
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
