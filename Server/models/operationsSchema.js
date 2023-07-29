const mongoose = require('mongoose')

const appSchema = mongoose.Schema

const operationSchema = new appSchema({
    user_upload_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    operation_type: {
        type: String,
        enum: ['withrawal', 'transference'],

    },
    month: {
        type: Number
    }



})

module.exports = mongoose.model('operations', operationSchema)
