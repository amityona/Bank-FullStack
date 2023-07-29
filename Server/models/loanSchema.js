const mongoose = require('mongoose')

const appSchema = mongoose.Schema

const loanSchema = new appSchema({
    user_upload_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    amount: {
        type: Number,
        require: true
    },
    date_paid: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 10 * 60 * 1000); // 10 Min
        },
    },
    paid: {
        type: Boolean,
        default: false
    }



})

module.exports = mongoose.model('loans', loanSchema)
