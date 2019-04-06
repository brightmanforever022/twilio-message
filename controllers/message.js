// import message model
const Message = require('../models/messageModel.js')

// Handle action to get all messages
exports.index = (req, res) => {
    Message.get((err, messages) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            })
        } else {
            res.json({
                status: "success",
                message: "Messages retrieved successfully",
                data: messages
            })
        }
    })
}

// Handle action to create new message
exports.new = (req, res) => {
    var message = new Message()
    message.message_name = req.body.message_name
    message.message_content = req.body.message_content
    message.message_to = req.body.message_to
    message.message_datetime = req.body.message_datetime

    message.save((saveErr, messageData) => {
        if (saveErr) {
            console.log('Error in saving message data: ', saveErr)
            res.json({
                status: 'error',
                message: saveErr
            })
        } else {
            res.json({
                status: 'success',
                message: 'New message data has been stored successfully.',
                data: messageData
            })
        }
    })
}

// Handle action to get message list in current queue
exports.getQueue = (req, res) => {
    Message.find({is_sent: false}, (err, messageData) => {
        if (err) {
            console.log('Error in getting message data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Messages in queue',
                data: messageData
            })
        }
    })
}

// Handle action to get previous messages
exports.getPreviousList = (req, res) => {
    Message.find({is_sent: true}, (err, messageData) => {
        if (err) {
            console.log('Error in getting message data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Previous sent messages',
                data: messageData
            })
        }
    })
}

// Handle action to remove message by id
exports.deleteById = (req, res) => {
    Message.findByIdAndRemove(req.params.message_id, (err, messageData) => {
        if (err) {
            console.log('Error in deleting message data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else (
            res.json({
                status: 'success',
                message: 'message data has been deleted successfully',
                data: messageData
            })
        )
    })
}

// Handle action to remove message by name
exports.deleteByName = (req, res) => {
    Message.find({message_name: req.params.message_name}).remove().exec((err, data) => {
        if (err) {
            console.log('Error in deleting message data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else (
            res.json({
                status: 'success',
                message: 'message data has been deleted successfully',
                data: data
            })
        )
    })
}
