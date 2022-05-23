const mysql = require('mysql2');

// Create connection to database
let connection = mysql.createConnection({
    //host: '/cloudsql/improvedspotafriend:us-central1:spotafriend1',              // public IP of instance
    user: 'root',              // name of created user 
    database: 'loginDB',      // name of created database (i.e. 'loginDB')
    password: 'CS35LSpotafriend',           // password of created user
    socketPath: '/cloudsql/improvedspotafriend:us-central1:spotafriend1'
});

// Connect to database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to DB: ' + error.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);

    // Create Users table in the database
    let createTable = 
    `CREATE TABLE IF NOT EXISTS Users(
        id int auto_increment primary key,
        username varchar(255) not null,
        email varchar(225) not null,
        password varchar(255) not null,
        confirmpassword varchar(255) not null
    );`
    connection.query(createTable, (error) => {
        if (error) throw error
        console.log("Users table created successfully!");
    })
})

module.exports = connection;
