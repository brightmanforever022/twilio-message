// FileName: index.js

// Import
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')

// Initialize
let app = express()
dotenv.load({ path: '.env'})
app.set('superSecret', process.env.SESSION_SECRET)

// Import routes
let apiRoutes = require("./api-routes")

// Use Api routes in the App
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/api', apiRoutes)

var MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, (mongoErr, db) => {
    if (mongoErr) {
        console.log('There is a problem in conecting to mongodb: ', mongoErr)
    } else {
        console.log('Connected correctly to db server')
    }
})

// Launch app to listen to specified port
var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log("Running beacon on port " + port)
})