const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if(token && token.startsWith('Bearer')) {
        try{
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(err) {
            res.status(401).json({ message: 'Not authorized' });
        }
    }else{
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
};

module.exports = protect;