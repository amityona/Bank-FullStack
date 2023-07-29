const loanSchema = require('./loanSchema');
const userSchema = require('./userSchema');
const opeartionSchema = require('./operationsSchema');

const configData = {
    silver: {
        maxWithrawalCount: 5,
        maxTransferenceCount: 15,
        percent: 250 / 100
    },
    gold: {
        maxWithrawalCount: 10,
        maxTransferenceCount: 20,
        percent: 500 / 100
    }
}


const checkAmountValidate = (typeAccount, amountOfLoan, balance, withrawalCount, transferenceCount) => {
    console.log("Take Acoount " + typeAccount + " Amount of Loan " + amountOfLoan + " balance " + balance + " Take Money " + withrawalCount
        + " Tranfare " + transferenceCount + " Check " + (balance * configData.silver.percent >= amountOfLoan));
    if (typeAccount == "basic") {
        return false;
    }
    if (typeAccount == "silver") {
        return checkSilverLoan(balance, withrawalCount, transferenceCount, amountOfLoan);
    }
    if (typeAccount == "gold") {
        return checkGoldLoan(balance, withrawalCount, transferenceCount, amountOfLoan);
    }
}

const checkGoldLoan = (balance, withrawalCount, transferenceCount, amountOfLoan) => {
    if ((withrawalCount < configData.gold.maxWithrawalCount) &&
        (transferenceCount < configData.gold.maxTransferenceCount)
        && (balance * configData.gold.percent >= amountOfLoan)) {
        return true;
    }
    else {
        return false;
    }

}


const checkSilverLoan = (balance, withrawalCount, transferenceCount, amountOfLoan) => {
    if ((withrawalCount < configData.silver.maxWithrawalCount) &&
        (transferenceCount < configData.silver.maxTransferenceCount)
        && (balance * configData.silver.percent >= amountOfLoan) && (amountOfLoan > 0)) {
        return true;
    }
    else {
        return false;
    }

}

const takeLoan = async (userID, amountOfLoan) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userSchema.findById(userID);
            if (user == null) {
                reject("User Not Found");
            }
            else {
                const today = new Date();
                const currentMonth = today.getMonth() + 1;
                let withrawalCount = await opeartionSchema.count({ user_upload_fk: user.id, operation_type: "withrawal", month: currentMonth });
                let transferenceCount = await opeartionSchema.count({ user_upload_fk: user.id, operation_type: "transference", month: currentMonth });
                //resolve("withrawalCount " + withrawalCount);
                const validateStatus = checkAmountValidate(user.account_type, amountOfLoan, user.balance, withrawalCount, transferenceCount);

                if (validateStatus == true) {
                    let newLoan = new loanSchema({
                        amount: amountOfLoan,
                        user_upload_fk: user.id,
                    })
                    await newLoan.save();
                    user.balance = user.balance + amountOfLoan;
                    user.save();
                    resolve({ status: "OK", balance: user.balance, amountOfLoan: amountOfLoan, paidDate: newLoan.date_paid });
                }
                else {
                    reject("Take Loan Is Fail."); //reject
                }

            }
        }
        catch (err) {
            reject(err);
        }

    })
}



const addLoan = async (userID, amount) => {

    return new Promise(async (resolve, reject) => {

        let loan = new loanSchema({
            amount: amount,
            user_upload_fk: userID,
        })
        await loan.save();
        resolve(loan);

    })
}


module.exports = { addLoan, takeLoan }