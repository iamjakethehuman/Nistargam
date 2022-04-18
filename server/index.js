const express = require('express')
const databaseConfig = require('./database')
const bp = require('body-parser')
const routesConfig = require('./controller/auth')


start()

async function start(){
    const app = express()

    
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))

    app.use(express.urlencoded({extended: true}))
    
    await databaseConfig(app)

    app.get('/getData', (req, res) => { 
        console.log(req.body)
        res.json({"statusCode":200,
        "statusMessage":"SUCCESS"
    })
    })

    routesConfig(app)

    app.listen(3000, () =>  {'Server running on port 3000!'})
}