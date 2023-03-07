const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ATIBAPI'
exports.createExpense = (req, res, next) => {
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    const id = req.body.userId
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
    const token = req.get('Authorization')
    const user = jwt.verify(token, SECRET_KEY);
    console.log(user);
    const id=user.userId
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

exports.deleteExpense = (req, res, next) => {
    const token = req.get('Authorization')
    const user = jwt.verify(token, SECRET_KEY);
    console.log(user);
    const id=user.userId
    Expense.findByPk(id)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
}
