var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var userSchema = new appSchema({
    userName: {
        type: String,
        require: true,
        unique: [true, "UserName Must be Unique"],
    },

    password: {
        type: String,
        require: true,
    },
    balance: {
        type: Number,
        default: 1000,
    },
    account_type: {
        type: String,
        enum: ['basic', 'silver', 'gold'],
        default: 'basic',
    },
})
module.exports = mongoose.model('users', userSchema)
