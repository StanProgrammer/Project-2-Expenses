const path = require('path')
const rootDir = path.dirname(require.main.filename);
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ATIBAPI'
const sequelize = require('../util/database');
exports.createExpense = async(req, res, next) => {
    
    try{
    const sequelizeTransaction = await sequelize.transaction(); 
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
    },
    {transaction: sequelizeTransaction})
    const tExpense = +req.user.totalExpense + +amount;
    User.update(
        { totalExpense: tExpense},
        {where: {id:req.user.id}}
        )
    await sequelizeTransaction.commit();
    res.status(201).json( data);
    } catch (error) {
        await sequelizeTransaction.rollback();
        res.status(500).json({error:error})
    } 
}


exports.displayAll = async (req, res, next) => {
    try{
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    console.log(id);
    const result = await Expense.findAll({where:{userId: id}})
    res.json(result)
    }catch(error){
        console.log(error);
    }
}

exports.deleteExpense = async (req, res, next) => {
    try{
        const sequelizeTransaction = await sequelize.transaction();
        const expenseId = req.params.expenseId;
    const token = req.header('Authorization');
    const user = jwt.verify(token, SECRET_KEY);
    const id=user.id
    const expenseField = await Expense.findByPk(expenseId, {where: { userId: id},transaction: sequelizeTransaction})
        await expenseField.destroy({transaction: sequelizeTransaction});
        const userTExpense = await User.findByPk(id,{
            attributes: ['totalExpense'],
            raw: true,
            transaction: sequelizeTransaction
        });
        const editedTotal = userTExpense.totalExpense - expenseField.dataValues.amount;
        await User.update({totalExpense: editedTotal},{where: {id:id}, transaction:sequelizeTransaction})
        await sequelizeTransaction.commit();
        
        res.status(201).json({delete: expenseField});
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
    const befExpense = await Expense.findByPk(expenseId,{
        attributes: ['amount'],
        raw: true,
        transaction: sequelizeTransaction
    });
    const chUser = await User.findByPk(id,{
        attributes: ['totalExpense'],
        raw: true,
        transaction: sequelizeTransaction
    });

    const updatedExpense = +chUser.totalExpense - +befExpense.amount + +amount;
    const updatedUser = await User.update({
        totalExpense: updatedExpense
    },{where: {id:id},transaction: sequelizeTransaction})

    const data = await Expense.update({
        amount: amount,
        description:description,
        category:category
    },{where: {id:expenseId}, transaction: sequelizeTransaction});
    sequelizeTransaction.commit();
    res.status(201).json( data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err})
    } 
}