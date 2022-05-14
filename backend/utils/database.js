const Sequelize = require('sequelize'); // import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'CS35LSpotafriend', {
    dialect: 'mysql',
    host: 'localhost', 
});

module.exports = sequelize;
