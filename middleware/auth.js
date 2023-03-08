const jwt = require('jsonwebtoken');
const User = require('../models/users');
const SECRET_KEY = 'ATIBAPI'
exports.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, SECRET_KEY);
        console.log(user);
        User.findByPk(user.id).then((user) => {
            req.user = user;
            console.log('hello');
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};

