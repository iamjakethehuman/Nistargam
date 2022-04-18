const mongoose = require('mongoose')
require('./models/Post')
require('./models/User')

const dbName = 'nistargam'
const connectionString = `mongodb://localhost:27017/${dbName}`

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log('database connected')

        mongoose.connection.on('error', (err) => {
            console.error('database error')
            console.error(err)
        })
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}