const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/users')
const Expense = require('./models/expense')
const Order = require('./models/order');
const cors = require('cors');
const sequelize = require('./util/database');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
app.use(userRoutes)
app.use('/user', userRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium', premiumRoutes);
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(
app.listen('3000',()=>{
  console.log('no error');
}))
.catch(err=>{console.log(err);})