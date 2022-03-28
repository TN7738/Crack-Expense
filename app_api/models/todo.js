const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    todolist: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gid: {
        type: String,
        required: true
    },
    list: [listSchema]
});

mongoose.model('Todo', todoSchema);