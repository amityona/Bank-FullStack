const bcrypt = require('bcrypt')
require('dotenv').config();

const hashsalastedPasswordToDb = async (password) => {
    try {
        const salt = process.env.SALT || "$2b$10$NJgd9MhMtVMBVSM8G0pGRO";
        var hashedPassword = await bcrypt.hash(password, salt)
    }
    catch (error) {
        console.log(error);
    }
    return hashedPassword;
}

const checkValidation = (password, accountType) => {

    if (accountType == 'basic') {
        return checkBasicPassword(password);
    }
    if (accountType == 'silver') {
        return checkSilverPassword(password);
    }
    else {
        return checkGoldPassword(password);
    }
}

const checkBasicPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,15}$/;
    return passwordRegex.test(password);
}
const checkSilverPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,15}$/;
    return passwordRegex.test(password);
}
const checkGoldPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,30}$/;
    return passwordRegex.test(password);
}


module.exports = { hashsalastedPasswordToDb, checkValidation }