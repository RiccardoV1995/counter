const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    date: Date,
    name: String
    
})

module.exports = Counter = mongoose.model('counter', CounterSchema)