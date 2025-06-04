const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
    
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }else{
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    }
}

exports.login = async (req, res) => {
   try {
     const {email, password} = req.body;
 
     if (!email || !password) {
       return res.status(400).json({ message: 'Please provide email and password' });
     }
 
     const user = await User.findOne({ email });
 
     if(user && (await bcrypt.compare(password,user.password))) {
         res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             token: generateToken(user._id)
         });
     }else{
         res.status(401).json({ message: 'Invalid email or password' });
     }
   } catch (error) {
     res.status(500).json({ message: 'Server error' });    
   }
};