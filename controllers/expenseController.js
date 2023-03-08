const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ATIBAPI'
exports.createExpense = async(req, res, next) => {
    try{
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    const data=await Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: id
    })
    const tExpense = +req.user.totalExpense + +amount;
    User.update(
        { totalExpense: tExpense},
        {where: {id:req.user.id}}
        )
    res.status(201).json( data);
    } catch (err) {
        res.status(500).json({error:err})
    } 
}


exports.displayAll = (req, res, next) => {
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    console.log(id);
    Expense.findAll({
        where:{
            userId: id
        }
    })
        .then((result) => {
            res.json(result)
        })
        .catch(err => console.log(err))
}

exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.expenseId;
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    const expenseField = await Expense.findByPk(expenseId, {where: { userId: id}})
    await expenseField.destroy();
    res.status(201).json({delete: expenseField})
}catch(error){
    console.log(error);
}
}

exports.editExpense = async (req,res,next)=>{
    try{
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    const expenseId = req.params.expenseId;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    console.log(req.user);
    const befExpense = await Expense.findByPk(expenseId,{
        attributes: ['amount'],
        raw: true
    });
    const chUser = await User.findByPk(id,{
        attributes: ['totalExpense'],
        raw: true
    })
    const updatedExpense = +chUser.totalExpense - +befExpense.amount + +amount;
    const updatedUser = await User.update({
        totalExpense: updatedExpense
    },{where: {id:id}})

    const data = await Expense.update({
        amount: amount,
        description:description,
        category:category
    },{where: {id:expenseId}});
    res.status(201).json( data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err})
    } 
}