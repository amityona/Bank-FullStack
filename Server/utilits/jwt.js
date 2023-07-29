var jwt = require('jsonwebtoken')
require('dotenv').config();

var makeToken = async (user) => {
    var token2 = jwt.sign({
        id: user._id,
        userName: user.userName,
    }, process.env.SECRET, { expiresIn: "2H" }
    )
    return token2;
}

var checkToken = async (req, res, next) => {
    try {
        const Token = req.headers.authorization.split(' ')[1]; // split Bearer token...
        jwt.verify(Token, process.env.SECRET, (err, infoJWT) => {
            if (err) {
                return res.status(401).json({ message: "Auth Fail" })
            }
            req.user = infoJWT;
            next();
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "Auth Fail" })
    }
}

/*
var betterCheckToken = (req,res,next)=> {
    const Token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(Token,"SecretKey",(err,jsonCryp)=>{
        if (err) {
            res.status(401).json({message:"Auth File"})
        }
        else{
            res.status(401).json({message:"Auth Success",info:jsonCryp})
        }
        
    })
}
*/
module.exports = { makeToken, checkToken }