const userSchema = require('./userSchema');
const operationSchema = require('./operationsSchema');

const withrawalOperation = async (userID, amount) => {
    return new Promise(async (resolve, reject) => {
        let user = await userSchema.findById(userID);
        if ((user.balance - amount >= 0) && (amount > 0)) {
            const newBalance = user.balance - amount;
            user.balance = newBalance;
            await user.save();
            await addOperation(user.id, "withrawal");
            resolve({ status: "OK", opeation: "withrawal", balance: user.balance, userName: user.userName })
        }
        else {
            reject("Cant Comeplete Overdraft Youer Balance." + user.balance)

        }
    })
}

const transferenceOperation = async (fromUserID, toUserName, amount) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userSchema.findById(fromUserID);
            let toUser = await userSchema.findOne({ userName: toUserName });
            if ((user == null) || (toUser == null)) {
                reject("User Not Found");
            }
            else if (amount <= 0) {
                reject("Cant Take Negative Number");
            }
            else {
                const newBalance = user.balance - amount; // Can be Negative
                user.balance = newBalance;
                await user.save();
                toUser.balance = toUser.balance + amount;
                await toUser.save();
                await addOperation(user.id, "transference");
                resolve({ status: "OK", opeation: "transference", balance: user.balance, userName: user.userName })
            }
        }
        catch (err) {
            reject("User NOT Found");
        }

    })
}



const addOperation = async (userID, operation_type) => {

    return new Promise(async (resolve, reject) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1

        let opearion = new operationSchema({
            operation_type: operation_type,
            user_upload_fk: userID,
            month: currentMonth
        })
        await opearion.save();
        resolve(opearion);

    })
}

module.exports = { addOperation, withrawalOperation, transferenceOperation }