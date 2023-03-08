const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ATIBAPI'
exports.createExpense = (req, res, next) => {
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: id
    })
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => { console.log(err); })
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
