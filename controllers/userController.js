const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const session = require('./sessionController')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ATIBAPI'
var ls = require('local-storage');
exports.createUser = async (req, res, next) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const existsuser1 = await User.findOne({ email: email })
    if (existsuser1) {
      return res.status(400).json('User already exists')
    }

    const saltrounds = 10
    const hashPassword = await bcrypt.hash(password, saltrounds)
    const result = await User.create({ name: name, email: email, phone: phone, password: hashPassword })
    const token = jwt.sign({ email: result.email, id: result.id }, SECRET_KEY)
    res.status(201).json({ message: 'Successfully Created', token: token })

    // res.redirect('/')
  } catch (err) {
    return res.status(400).send();
  }
}

exports.displaySignUp = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'signup.html'))
}
exports.loginPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'login.html'))
}
exports.homePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'),{headers: {'Authorization': `123`}})
}

exports.checkUser = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user1 = await User.findOne({ where: { email: email } })
    if (!user1) {
      res.status(404).json({ message: 'User Doesnt Exists' })
    }
    const hash = user1.dataValues.password
    await bcrypt.compare(password, hash, function (err, result) {
      if (result == false) {
        return res.status(401).json({ message: 'Wrong Password' })
      }
      const token = jwt.sign({ email: user1.email, id: user1.id }, SECRET_KEY)
      ls('token',token)
      res.status(200).json({ message: 'User Logging successfull', token: token })
      
    });
  } catch (error) {
    console.log(error);
  }
}


// exports.displayAll = (req, res, next) => {
//     User.findAll()
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(err => console.log(err))
// }


// exports.deleteOne = (req, res, next) => {
//     const id = req.query.id;
//     User.findByPk(id)
//     .then(user => {
//         return user.destroy();
//     })
//     .then(result => {
//         res.redirect('/');
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }
