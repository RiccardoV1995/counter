const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/UserModel')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET)
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)

        return res.json({
            id: user.id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body

        if (!username | !email | !password) {
            return res.status(400).json({message: 'All fields are required'})
        }

        // Check if the email already exists
        const checkEmail = await User.findOne({email})
        if (checkEmail) {
            return res.status(400).json({message: 'Email already exists'})
        }

        // Hash password
        const hash = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, hash)

        const userData = {
            username,
            email,
            password: hashPassword
        }

        const newUser = await User.create(userData)

        return res.json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser.id)
        })        
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email | !password) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(400).json({message: 'Password not match'})
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user)

        res.json({message: 'User removed'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const {
            username,
            email
        } = req.body

        const userData = {username, email}

        const userUpdated = await User.findByIdAndUpdate(req.user, userData, {new: true})

        res.json({
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            token: generateToken(userUpdated.id)
        })
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const updatePasswordUser = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword
        } = req.body

        const checkUser = await User.findById(req.user)

        const comparePassword = bcrypt.compare(oldPassword, checkUser.password)

        if (!comparePassword) {
            return res.status(400).json({message: 'Old password not match'})
        }

        const salt = await bcrypt.genSalt(10)
        const newPasswordHashed = await bcrypt.hash(newPassword, salt)

        const userUpdated = await User.findByIdAndUpdate(req.user, {password: newPasswordHashed}, {new: true})

        res.json({
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            token: generateToken(userUpdated.id)
        })
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

module.exports = {
    getUser,
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    updatePasswordUser,
}