const mongoose = require('mongoose');

require('dotenv').config();

const MongoUrl = process.env.MONGO_URL;

mongoose.connect(MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
