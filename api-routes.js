// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()
const dotenv = require('dotenv')
let app = require('express')()
dotenv.config({ path: '.env'})
app.set('superSecret', process.env.SESSION_SECRET)

// Import controllers
// var authenticateController = require('./controllers/authenticate')
var messageController = require('./controllers/message')

// Message routes
router.route('/messages')
    .get(messageController.index)
    .post(messageController.new)

router.route('./messages/getQueue')
    .get(messageController.getQueue)

router.route('./messages/getPreviousList')
    .get(messageController.getPreviousList)
    
router.route('/messages/:message_id')
    .delete(messageController.deleteById)

router.route('/message/:message_name')
    .delete(messageController.deleteByName)


// Export API routes
module.exports = router