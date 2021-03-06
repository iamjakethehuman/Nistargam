const express = require('express')
const databaseConfig = require('./database')
const bp = require('body-parser')
const routesConfig = require('./controller/auth')
const multer = require('multer')


start()

async function start() {
    const app = express()


    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))
    app.use('/static', express.static('static'))
    app.use(express.urlencoded({ extended: true }))
    app.use('/uploads', express.static('uploads'))
    await databaseConfig(app)

    app.get('/getData', (req, res) => {
        console.log(req.body)
        res.json({
            "statusCode": 200,
            "statusMessage": "SUCCESS"
        })
    })
    
    routesConfig(app)

    app.listen(3000, () => { 'Server running on port 3000!' })
}