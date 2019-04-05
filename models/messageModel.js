// messageModel.js

var mongoose = require('mongoose')

// Setup schema
var messageSchema = mongoose.Schema({
    message_name: {
        type: String,
        required: true,
        unique: true
    },
    message_content: {
        type: String,
        required: true
    },
    message_to: {
        type: String,
        required: true
    },
    message_datetime: {
        type: String,
        required: true
    },
    is_sent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Export Message model
var Message = module.exports = mongoose.model('message', messageSchema)

module.exports.get = (callback, limit) => {
    Message.find(callback).limit(limit)
}