const Sequelize = require('sequelize'); // import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'CS35LSpotafriend', {
    dialect: 'mysql',
    host: 'localhost',
    // host: '/cloudsql/spotafriend:us-west2:spotafriend',
    // dialectOptions: {
    //     socketPath: '/cloudsql/spotafriend:us-west2:spotafriend'
    // } 
});

module.exports = sequelize;
