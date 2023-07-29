const express = require('express')
const loanBL = require('../models/loanBL');
const authToken = require('../utilits/jwt')

const app = express();
const appRouter = express.Router()

// Take Loan
appRouter.route('/').post(authToken.checkToken, async (req, res, next) => {

    try {

        const loanData = await loanBL.takeLoan(req.user.id, req.body.amount);
        return res.status(200).json(loanData);
    }
    catch (err) {
        next(err);
    }

});



module.exports = appRouter