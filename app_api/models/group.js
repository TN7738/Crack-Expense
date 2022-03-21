const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupMembers:[String]
});

mongoose.model('Group', groupSchema);