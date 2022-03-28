const mongoose = require('mongoose');
const user = mongoose.model('User');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const userListAll = (req, res) => {
    user
        .find()
        .exec((err, userdata) => {
            if (err) {
                sendJSONResponse(res, 404, err);
                return;
            } else if (userdata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'user list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, userdata);
            }
        });
};

const userCreate = (req, res) => {
    user
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }, (err, userdata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, userdata);
            }
        });
};

const userReadOne = (req, res) => {
    if (req.params && req.params.userid) {
        user
            .findById(req.params.userid)
            .exec((err, userdata) => {
                if (!userdata) {
                    sendJSONResponse(res, 404, { 'message': 'userid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, userdata);
                }
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'No userid in request' });
    }
};

const userUpdateOne = (req, res) => {
    if (!req.params.userid) {
        sendJSONResponse(res, 404, { 'message': 'userid is required' });
        return;
    }
    user
        .findById(req.params.userid)
        .exec((err, userdata) => {
            if (!userdata) {
                sendJSONResponse(res, 404, { 'message': 'no userdata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            userdata.firstName = req.body.firstName;
            userdata.lastName = req.body.lastName;
            userdata.email = req.body.email;
            userdata.password = req.body.password;
            userdata.save((err, userdata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, userdata);
                }
            });
        });
};

const userDeleteOne = (req, res) => {
    const userid = req.params.userid;
    if (userid) {
        user
            .findByIdAndRemove(userid)
            .exec((err, userdata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'userid is required' });
    }
};

module.exports = {
    userListAll,
    userCreate,
    userReadOne,
    userUpdateOne,
    userDeleteOne
};