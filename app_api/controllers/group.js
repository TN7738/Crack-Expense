const mongoose = require('mongoose');
const group = mongoose.model('Group');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const groupListAll = (req, res) => {
    group
        .find()
        .exec((err, groupdata) => {
            console.log(groupdata);
            if (err) {
                console.log(req);
                sendJSONResponse(res, 404, err);
                return;
            } else if (groupdata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'group list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, groupdata);
            }
        });
};

const groupCreate = (req, res) => {
    group
        .create({
            groupName: req.body.groupName,
            groupMembers:['6229253bfa6c6a6f46ccea37','62292655b36e8537a019df8f'],
        }, (err, groupdata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, groupdata);
            }
        });
};

  
module.exports = {
    groupCreate,
    groupListAll
};