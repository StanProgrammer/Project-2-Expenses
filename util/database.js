const Sequelize  = require('sequelize');


const sequelize = new Sequelize('mobileapp', 'root', 'atib', {
    host: 'localhost',
    dialect: 'mysql'
  });
  module.exports=sequelize