// message.js

// import message model
const Message = require('../models/messageModel.js')

// import helpers
const CommonHelper = require('../helpers/common')

// Handle action to list messages
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

// Handle action to create message
exports.new = (req, res) => {
    var message = new Message()
    message.message_name = req.body.message_name
    message.message_uuid = req.body.message_uuid
    message.message_major = req.body.message_major
    message.message_minor = req.body.message_minor

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

// Handle action to get a beacon by id
exports.view = (req, res) => {
    Beacon.findById(req.params.beacon_id, (err, beaconData) => {
        if (err) {
            console.log('Error in getting beacond data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Beacond Data by id',
                data: beaconData
            })
        }
    })
}

// Handle action to get a beacon by uid
exports.getBeaconByUid = (req, res) => {
    Beacon.findOne({beacon_uuid: req.params.beacon_uuid}, (err, beaconData) => {
        if (err) {
            console.log('Error in getting beacond data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Beacond Data by uuid',
                data: beaconData
            })
        }
    })
}

// Handle action to remove beacon
exports.delete = (req, res) => {
    Beacon.findByIdAndRemove(req.params.beacon_id, (err, beaconData) => {
        if (err) {
            console.log('Error in deleting beacon data: ', err)
            res.json({
                status: 'error',
                message: err
            })
        } else (
            CommonHelper.addHistory('beacon', beaconData._id, 'deleted', (historyErr, historyRes) => {
                if (historyErr) {   // Deleted successfully, but there is a problem in adding history
                    res.json({
                        status: 'success, but not stored history into db',
                        message: 'beacon data has been deleted successfully',
                        data: beaconData
                    })
                } else {
                    res.json({
                        status: 'success',
                        message: 'beacon data has been deleted successfully',
                        data: beaconData
                    })
                }
            })
        )
    })
}
