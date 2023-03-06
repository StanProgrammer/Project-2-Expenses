const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Expense = require('../models/expense')
exports.createExpense = (req, res, next) => {
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    Expense.create({
        amount: amount,
        description: description,
        category: category
    })
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => { console.log(err); })
}

exports.displayAll = (req, res, next) => {
    Expense.findAll()
        .then((result) => {
            res.json(result)
        })
        .catch(err => console.log(err))
}

exports.deleteExpense = (req, res, next) => {
    const id = req.query.id;
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
