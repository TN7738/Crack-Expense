const mongoose = require('mongoose');
const expense = mongoose.model('Expense');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const expenseListAll = (req, res) => {
    expense
        .find()
        .exec((err, expensedata) => {
            if (err) {
                sendJSONResponse(res, 404, err);
                return;
            } else if (expensedata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'expense list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, expensedata);
            }
        });
};

const expenseCreate = (req, res) => {
    expense
        .create({
            gid: req.body.gid,
            name: req.body.name,
            date: req.body.date,
            gmembers: req.body.gmembers,
            img: req.body.img
        }, (err, expensedata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, expensedata);
            }
        });
};

const expenseReadOne = (req, res) => {
    if (req.params && req.params.expenseid) {
        expense
            .findById(req.params.expenseid)
            .exec((err, expensedata) => {
                if (!expensedata) {
                    sendJSONResponse(res, 404, { 'message': 'expenseid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, expensedata);
                }
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'No expenseid in request' });
    }
};

const expenseUpdateOne = (req, res) => {
    if (!req.params.expenseid) {
        sendJSONResponse(res, 404, { 'message': 'expenseid is required' });
        return;
    }
    expense
        .findById(req.params.expenseid)
        .exec((err, expensedata) => {
            if (!expensedata) {
                sendJSONResponse(res, 404, { 'message': 'no expensedata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            expensedata.gid = req.body.gid;
            expensedata.name = req.body.name;
            expensedata.date = req.body.date;
            expensedata.gmembers = req.body.gmembers;
            expensedata.img = req.body.img;
            expensedata.save((err, expensedata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, expensedata);
                }
            });
        });
};

const expenseDeleteOne = (req, res) => {
    const expenseid = req.params.expenseid;
    if (expenseid) {
        expense
            .findByIdAndRemove(expenseid)
            .exec((err, expensedata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'expenseid is required' });
    }
};

module.exports = {
    expenseListAll,
    expenseCreate,
    expenseReadOne,
    expenseUpdateOne,
    expenseDeleteOne
};