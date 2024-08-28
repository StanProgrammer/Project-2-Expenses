const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
// const session = require('./sessionController')
const {SECRET_KEY} = process.env
const { userValidationSchema } = require('../util/validation');

exports.createUser = async (req, res) => {
  try {
      // Validate the request body
      const { error } = userValidationSchema.validate(req.body);
      if (error) {
          return res.status(200).json({ message: error.details[0].message });
      }

      const { name, email, password, phone } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(200).json({ message: 'User already exists', statusCode: 400 });
      }

      const saltrounds = 10;
      const hashPassword = await bcrypt.hash(password, saltrounds);
      const result = await User.create({ name, email, phone, password: hashPassword, isPremiumUser: false, totalExpense: 0 });
      const token = await this.generateAccessToken( result.id,result.name,result.email, result.isPremiumUser);
      return res.status(200).json({ message: 'Successfully Created', token, userId: result.id, statusCode: 200 });

  } catch (err) {
      return res.status(400).send();
  }
};
exports.generateAccessToken=(id, name,email, isPremiumUser) => jwt.sign({ id, name, email, isPremiumUser}, SECRET_KEY)

exports.displaySignUp = (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'views', 'signup.html'))
}
exports.forgot = (req, res) => {
  res.sendFile(path.join(rootDir, 'public','views', 'forgotpassword.html'))
}
exports.loginPage = (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'views', 'login.html'))
}
exports.homePage = (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'views', 'home.html'),{headers: {'Authorization': `123`}})
}

exports.checkUser = async (req, res) => {
  try {
    
    const {email} = req.body
    const {password} = req.body
    const user1 = await User.findOne({ where: { email } })
    if (!user1) {
      res.status(404).json({ message: 'User Doesnt Exists' })
    }
    const hash = user1.dataValues.password
    bcrypt.compare(password, hash, (err, result) => {
      if (result === false) {
        return res.status(401).json({ message: 'Wrong Password' });
      }
      jwt.sign({ email: user1.email, id: user1.id }, SECRET_KEY);
      return res.status(200).json({ message: 'User Logging successfull', token: this.generateAccessToken(user1.id, user1.name, user1.email, user1.isPremiumUser), userId: user1.id });

    });
  } catch (error) {
    console.log(error);
  }
}


