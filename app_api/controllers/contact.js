const mongoose = require('mongoose');
const contact = mongoose.model('Contact');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const contactListAll = (req, res) => {
    contact
        .find()
        .exec((err, contactdata) => {
            if (err) {
                sendJSONResponse(res, 404, err);
                return;
            } else if (contactdata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'contact list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, contactdata);
            }
        });
};

const contactListCreate = (req, res) => {
    contact
        .create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,

        }, (err, contactdata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, contactdata);
            }
        });
};

const contactListReadOne = (req, res) => {
    if (req.params && req.params.contactid) {
        contact
            .findById(req.params.contactid)
            .exec((err, contactdata) => {
                if (!contactdata) {
                    sendJSONResponse(res, 404, { 'message': 'contactid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, contactdata);
                }
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'No contactid in request' });
    }
};

const contactListUpdateOne = (req, res) => {
    if (!req.params.contactid) {
        sendJSONResponse(res, 404, { 'message': 'contactid is required' });
        return;
    }
    contact
        .findById(req.params.contactid)
        .exec((err, contactdata) => {
            if (!contactdata) {
                sendJSONResponse(res, 404, { 'message': 'no contactdata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            contactdata.url = req.body.url;
            contactdata.photographer = req.body.photographer;
            contactdata.img_name = req.body.img_name;
            contactdata.tags = req.body.tags;
            contactdata.aprture = req.body.aprture;
            contactdata.shut_speed = req.body.shut_speed;
            contactdata.save((err, contactdata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, contactdata);
                }
            });
        });
};

const contactListDeleteOne = (req, res) => {
    const contactid = req.params.contactid;
    if (contactid) {
        contact
            .findByIdAndRemove(contactid)
            .exec((err, contactdata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'contactid is required' });
    }
};

module.exports = {
    contactListAll,
    contactListCreate,
    contactListReadOne,
    contactListUpdateOne,
    contactListDeleteOne
};