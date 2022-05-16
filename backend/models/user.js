// import { Sequelize } from 'sequelize';
const Sequelize = require('sequelize');

// import sequelize from '../utils/database.js';
const sequelize = require('../utils/database.js');

const User = sequelize.define('users', {
   user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   username: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   confirmpassword: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
   },
   updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
   },
});

module.exports = User;
// export default User;