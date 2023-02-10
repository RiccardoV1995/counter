const Counter = require('../models/ConterModel')

const owner = async (req, res, next) => {
    try {
        const counter = await Counter.findById(req.params.id)
        
        if (!counter) {
            return res.status(404).json({message: 'Counter not found'})
        }

        if (counter.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: 'Action not allowed'})
        }

        req.counter = counter
        next()
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        console.log(error)
    }
}

module.exports = owner