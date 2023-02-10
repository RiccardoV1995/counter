const express = require('express')
const Route = express.Router()

const auth = require('../middleware/auth')

const {
    getUser,
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    updatePasswordUser
} = require('../controllers/UserControllers')

Route.route('/')
    .get(auth, getUser)
    .post(createUser)
    .delete(auth, deleteUser)
    .put(auth, updateUser)

Route.post('/login', loginUser)


Route.put('/password-update', auth, updatePasswordUser)

module.exports = Route