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
            if (err) {
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
            groupMembers: req.body.groupMembers
        }, (err, groupdata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, groupdata);
            }
        });
};

const groupReadOne = (req, res) => {
    if (req.params && req.params.groupid) {
        group
            .findById(req.params.groupid)
            .exec((err, groupdata) => {
                if (!groupdata) {
                    sendJSONResponse(res, 404, { 'message': 'groupid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, groupdata);
                }
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'No groupid in request' });
    }
};

const groupUpdateOne = (req, res) => {
    if (!req.params.groupid) {
        sendJSONResponse(res, 404, { 'message': 'groupid is required' });
        return;
    }
    group
        .findById(req.params.groupid)
        .exec((err, groupdata) => {
            if (!groupdata) {
                sendJSONResponse(res, 404, { 'message': 'no groupdata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            groupdata.groupName = req.body.groupName;
            groupdata.groupMembers = req.body.groupMembers;
            groupdata.save((err, groupdata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, groupdata);
                }
            });
        });
};

const groupDeleteOne = (req, res) => {
    const groupid = req.params.groupid;
    if (groupid) {
        group
            .findByIdAndRemove(groupid)
            .exec((err, groupdata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'groupid is required' });
    }
};

module.exports = {
    groupListAll,
    groupCreate,
    groupReadOne,
    groupUpdateOne,
    groupDeleteOne
};