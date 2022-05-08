import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'CS35LSpotafriend', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;