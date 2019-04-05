// common.js

// Import History model
const History = require('../models/historyModel')

// Handle action to list histories
exports.listHistory = (callback) => {
    History.get((err, histories) => {
        if (err) {
            callback(err)
        } else {
            callback(null, histories)
        }
    })
}

// Handle action to store history
exports.addHistory = (history_collection_name, history_data_id, original_data, new_data, history_action, callback) => {
    var history = new History()
    history.history_collection_name = history_collection_name
    history.history_data_id = history_data_id
    history.original_data = original_data
    history.new_data = new_data
    history.history_action = history_action
    // history.log_at = moment().format('yyyy-mm-dd:hh:mm:ss')

    history.save((err, historyData) => {
        if (err) {
            callback(err)
        } else {
            callback(null, historyData)
        }
    })
}