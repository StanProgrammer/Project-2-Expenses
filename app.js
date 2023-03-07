const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes')
const User = require('./models/users')
const Expense = require('./models/expense')
const cors = require('cors');
const sequelize = require('./util/database');
// const rootDir = path.dirname(require.main.filename);
// const session = require('express-session')
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoutes)
app.use('/user',userRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()
.then(
app.listen('3000',()=>{
  console.log('no error');
}))
.catch(err=>{console.log(err);})