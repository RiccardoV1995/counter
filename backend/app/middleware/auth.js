const jwt = require('jsonwebtoken')

const User = require('../models/UserModel')

const auth = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({message: 'Not authorized'})
    }
    try {
        const decoded = await jwt.verify(token.split(' ')[1], process.env.SECRET)

        req.user = await User.findById(decoded.id).select('-password')

        next()
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

module.exports = auth