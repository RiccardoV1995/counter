const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_DB, {useNewUrlParser: true})

        console.log('DB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnection