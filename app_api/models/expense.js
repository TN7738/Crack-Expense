const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    gid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    paidby: {
        type: String,
        required: true
    },
    gmembers: {
        type: [String],
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        required: false
    }
});

mongoose.model('Expense', expenseSchema);