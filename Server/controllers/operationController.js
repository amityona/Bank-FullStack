const express = require('express')
const opearionBL = require('../models/operationBL');
const authToken = require('../utilits/jwt')

const app = express();
const appRouter = express.Router()

// withrawal Operation
appRouter.route('/withrawal').post(authToken.checkToken, async (req, res, next) => {

    try {

        const opearionData = await opearionBL.withrawalOperation(req.user.id, req.body.amount);
        return res.status(200).json(opearionData);
    }
    catch (err) {
        next(err);
    }

});

appRouter.route('/transference').post(authToken.checkToken, async (req, res, next) => {

    try {

        const opearionData = await opearionBL.transferenceOperation(req.user.id, req.body.toUserName, req.body.amount);
        return res.status(200).json(opearionData);
    }
    catch (err) {
        next(err);
    }

});




module.exports = appRouter