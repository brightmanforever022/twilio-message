// Import
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const dotenv = require('dotenv')
const Message = require('./models/messageModel');
const Twilio = require('twilio')

// Initialize
let app = express()
dotenv.config({ path: '.env'})
app.set('superSecret', process.env.SESSION_SECRET)

// twilio client

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER
const twilioClient = Twilio(accountSid, authToken)



// Import routes
let apiRoutes = require("./api-routes")

// Use Api routes in the App
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/api', apiRoutes)

const MONGODB_URI = process.env.MONGODB_URI
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
    console.log("Running twilio-message on port " + port)
})

var messageTimer = setInterval(messageSender, 60000);

function messageSender() {
    Message.find({is_sent: false}, (err, messageList) => {
        if (err) {
            console.log('message error: ', err)
        } else {
            messageList.map(messageItem => {
                var currentDate = new Date().getTime();
                var messageDate = new Date(messageItem.message_datetime).getTime();
                if (currentDate >= messageDate) {
                    sendMessage(messageItem.message_content, messageItem.message_to, (err, res) => {
                        if (err) {
                            console.log('There is a problem to send message through twiliio.')
                        } else {
                            var newMessage = messageItem
                            newMessage.is_sent = true
                            newMessage.save()
                        }
                    })
                }
            })
        }
    })
}

function sendMessage(message_content, message_to, callback) {
    twilioClient.messages.create({from: twilioNumber, body: message_content, to: message_to}).then(message => {
        console.log('message sent to : ', message_to)
        callback(null)
    }).catch(e => {
        console.log('there is a problem in sending message through twilio: ', e)
    })
}