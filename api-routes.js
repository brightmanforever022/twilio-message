// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()
const dotenv = require('dotenv')
let app = require('express')()
dotenv.load({ path: '.env'})
app.set('superSecret', process.env.SESSION_SECRET)

// Import controllers
// var authenticateController = require('./controllers/authenticate')
var messageController = require('./controllers/message')

// Employee routes
router.route('/messages')
    .get(messageController.index)
    .post(messageController.new)
    .delete(messageController.deleteAll)

// Export API routes
module.exports = router