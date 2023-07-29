const User = require('./userSchema');
const utilitsPassword = require('../utilits/passwordUtils');
const authToken = require('../utilits/jwt')

const addUser = async (newUser) => {

    if (utilitsPassword.checkValidation(newUser.password, newUser.account_type)
        == false) {
        throw new Error("Password Not Valid .")
    }

    const password = await utilitsPassword.hashsalastedPasswordToDb(newUser.password);

    return new Promise(async (resolve, reject) => {

        var UserToDB = new User({
            userName: newUser.userName,
            password: password,
            account_type: newUser.account_type
        }
        )

        console.log(UserToDB);

        try {
            await UserToDB.save();
            resolve(UserToDB)


        }
        catch (err) {
            reject(err);
        }
    })
}

const login = async (user) => {
    const password = await utilitsPassword.hashsalastedPasswordToDb(user.password);
    return new Promise(async (resolve, reject) => {

        try {
            const userFind = await User.findOne({ userName: user.userName, password: password });
            if (userFind == null) {
                reject("User Not Found.")
            }
            else {
                resolve({ token: await authToken.makeToken(userFind), userName: userFind.userName })
            }

        }
        catch (err) {
            reject(err)
        }
    })
}

const getData = async (userID) => {
    return new Promise(async (resolve, reject) => {

        try {
            const userFind = await User.findById(userID);
            if (userFind == null) {
                reject("User Not Found.")
            }
            else {
                resolve({ userName: userFind.userName, balance: userFind.balance });
            }

        }
        catch (err) {
            reject(err)
        }
    })
}

module.exports = { addUser, login, getData }