const loanSchema = require('./loanSchema');
const userSchema = require('./userSchema');

function hasDatePassed(date) {
    const currentDate = new Date();
    return date.getTime() < currentDate.getTime();
}


async function processAllDocuments() {
    try {
        const allDocuments = await loanSchema.find({ paid: false }).exec();

        // Loop through the documents and handle the expired ones
        allDocuments.forEach(async (doc) => {
            const isDatePassed = hasDatePassed(doc.date_paid);
            if (isDatePassed) {
                console.log('Document ID:', doc._id, '- The date has passed the current date. ' + doc.date_paid);
                let user = await userSchema.findById(doc.user_upload_fk);
                const fivePrecentFronLoan = doc.amount * 5 / 100;
                user.balance = user.balance - doc.amount - fivePrecentFronLoan;
                await user.save();
                await loanSchema.updateOne({ _id: doc._id }, { paid: true });
            } else {
                console.log('Document ID:', doc._id, '- The date is in the future. ' + doc.date_paid);
            }
        });
    } catch (error) {
        console.error('Error processing documents:', error);
    }
}

module.exports = { processAllDocuments }

