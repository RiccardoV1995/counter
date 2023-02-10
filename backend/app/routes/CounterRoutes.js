const express = require('express')
const Route = express.Router()

const auth = require('../middleware/auth')
const owner = require('../middleware/owner')

const {
    createCounter,
    allCounter,
    singleCounter,
    updateCounter,
    deleteCounter,
} = require('../controllers/CounterControllers')

Route.route('/')
    .post(auth, createCounter)
    .get(auth, allCounter)

Route.route('/:id')
    .get(auth, owner, singleCounter)
    .put(auth, owner, updateCounter)
    .delete(auth, owner, deleteCounter)

module.exports = Route