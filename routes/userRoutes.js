const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.get('/',userController.displayLogin)
router.use('/login',userController.createUser)
// router.get('/show',userController.displayAll)
// router.get('/delete',userController.deleteOne)
module.exports=router