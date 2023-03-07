const jwt = require('jsonwebtoken');
const User = require('../models/users');
var ls = require('local-storage');
const SECRET_KEY = 'ATIBAPI'
const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization');
        const token = req.header('Authorization');
        // console.log(req);
        const user = jwt.verify(token, SECRET_KEY);
        await User.findByPk(user.id).then((user) => {
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Please login first' });
        
    }
};
module.exports = auth