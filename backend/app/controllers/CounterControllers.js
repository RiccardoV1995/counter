const Counter = require('../models/ConterModel')

const createCounter = async (req, res) => {
    try {
        const {
            date,
            name,
        } = req.body

        const counterData = {
            user: req.user,
            date,
            name,
        }

        const newCounter = await Counter.create(counterData)

        res.json(newCounter)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const allCounter = async (req, res) => {
    try {
        const counters = await Counter.find({user: req.user})

        res.json(counters)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const singleCounter = async (req, res) => {
    try {
        res.json(req.counter)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const updateCounter = async (req, res) => {
    try {
        const {
            date,
            name,
        } = req.body

        const counterData = {
            date,
            name,
        }

        const updatedCounter = await Counter.findByIdAndUpdate(req.counter._id, counterData, {new: true})

        res.json(updatedCounter)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

const deleteCounter = async (req, res) => {
    try {
        const counter = await Counter.findByIdAndRemove(req.counter._id)

        res.json(counter)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

module.exports = {
    createCounter,
    allCounter,
    singleCounter,
    updateCounter,
    deleteCounter,
}