const express = require('express')
const userBL = require('../models/userBL');
const authToken = require('../utilits/jwt')

const app = express();
const appRouter = express.Router()

// Create New User 
appRouter.route('/').post(async (req, res, next) => {

    try {

        const user = await userBL.addUser(req.body);
        return res.status(201).json({ status: "User Created" });
    }
    catch (err) {
        next(err);
    }

});

// Get User Data
appRouter.route('/').get(authToken.checkToken, async (req, res, next) => {

    try {

        const user = await userBL.getData(req.user.id);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }

});

appRouter.route('/login').post(async (req, res, next) => {

    try {
        const token = await userBL.login(req.body);
        return res.status(201).json(token);
    }
    catch (err) {
        next(err);
    }

});






module.exports = appRouter