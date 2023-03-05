const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.get('/',userController.displaySignUp)
router.use('/login',userController.createUser)
router.get('/loginPage',userController.loginPage)
module.exports=router