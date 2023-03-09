const fs=require('fs')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/users')
const Expense = require('./models/expense')
const Order = require('./models/order');
const Forgotpassword = require('./models/forgotpassword');
const DownloadUrl = require('./models/downloadUrl');
const cors = require('cors');
const sequelize = require('./util/database');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const forgotpasswordRoutes = require('./routes/forgotRoutes');

dotenv.config();
app.use(express.static('public'))
app.use(cors())

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoutes)
app.use('/user', userRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium', premiumRoutes);
app.use('/password', forgotpasswordRoutes);
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadUrl);
DownloadUrl.belongsTo(User);

sequelize.sync()
.then(
app.listen(`${process.env.PORT}`,()=>{
  console.log('no error');
}))
.catch(err=>{console.log(err);})