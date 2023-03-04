const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes')
const User = require('./models/users')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(userRoutes)
app.use('/user',userRoutes)

User.sync()
.then(
app.listen('3000',()=>{
  console.log('no error');
}))

.catch(err=>{console.log(err);})