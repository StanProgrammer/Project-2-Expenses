const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
exports.createUser = async (req, res, next) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        const password = req.body.password
    await User.create({
        name: name,
        email: email,
        phone:phone,
        password: password
    })
    res.redirect('/')
    }catch(err){
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
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
}

exports.checkUser= async (req,res,next)=>{
    try{
    const email=req.body.email
    const password=req.body.password
    // console.log(email,password);
    const user1=await User.findAll({
        where: {
          email: email
        }
      })
    //   console.log(user1);
      if(user1.length===0){
        res.status(404).send("User doesn't exists")
      }
      else if(user1[0].dataValues.password===password){
        res.status(200).send('User Logging successfull')
      }
      else if(user1[0].dataValues.password!==password){
        res.status(401).send('Wrong password')
      }
    //   console.log(user1[0].dataValues);
    }catch(error){
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
