const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')

const dbConnection = require('./backend/db/db')

const app = express()

dbConnection()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/users', require('./backend/app/routes/UserRoutes'))
app.use('/api/counters', require('./backend/app/routes/CounterRoutes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname+'/frontend/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server run on port ${PORT}`))