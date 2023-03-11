const Sequelize  = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`,`${process.env.USER_NAME}`, `${process.env.USER_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql'
  });
  console.log(process.env.USER_PASSWORD);
  module.exports=sequelize