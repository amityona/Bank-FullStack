const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cron = require('node-cron');

const { errorHandlerMiddleware } = require('./utilits/errorHandle');
const userController = require('./controllers/userController');
const opearionController = require('./controllers/operationController')
const loanController = require('./controllers/loanController');
const cronBL = require('./models/CronBL');

require('dotenv').config();
require('./config/databaseConfig')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

const PORT = process.env.PORT || 4000;


app.use('/users', userController)
app.use('/opeation', opearionController)
app.use('/loan', loanController)

app.get('/', (req, res) => {
    return res.json({ status: "Server is UP" });
})

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log("Server is up On Port " + PORT);
})

// Schedule the cron job to run every hour (adjust the cron schedule as needed)
cron.schedule('* * * * *', () => {
    console.log('Running the document check...');
    cronBL.processAllDocuments();
});

