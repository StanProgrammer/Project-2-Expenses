const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const expenseController = require('../controllers/expenseController')
const auth = require('../middleware/auth')
router.get('/',userController.displaySignUp)
router.use('/login',userController.createUser)
router.get('/loginPage',userController.loginPage)
router.use('/check',userController.checkUser)
router.get('/home',auth, userController.homePage)
router.use('/home/expense',auth,expenseController.createExpense)
router.get('/home/show',auth,expenseController.displayAll)
router.get('/home/delete',auth,expenseController.deleteExpense)
module.exports=router