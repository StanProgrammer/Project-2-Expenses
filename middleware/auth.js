const jwt = require('jsonwebtoken');
const User = require('../models/users');
var ls = require('local-storage');
const SECRET_KEY = 'ATIBAPI'
const auth = (req, res, next) => {
    try {
        const token=ls.get('token')
        console.log(token);
        const user = jwt.verify(token, SECRET_KEY);
        User.findByPk(user.id).then((user) => {
            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};
module.exports = auth