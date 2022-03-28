const mongoose = require('mongoose');
const todo = mongoose.model('Todo');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const todoListAll = (req, res) => {
    todo
        .find()
        .exec((err, tododata) => {
            if (err) {
                sendJSONResponse(res, 404, err);
                return;
            } else if (tododata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'todo list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, tododata);
            }
        });
};

const todoCreate = (req, res) => {
    todo
        .create({
            name: req.body.name,
            gid: req.body.gid,
            // list: req.body.list
        }, (err, tododata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, tododata);
            }
        });
};

const todoReadOne = (req, res) => {
    if (req.params && req.params.todoid) {
        todo
            .findById(req.params.todoid)
            .exec((err, tododata) => {
                if (!tododata) {
                    sendJSONResponse(res, 404, { 'message': 'todoid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, tododata);
                }
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'No todoid in request' });
    }
};

const todoUpdateOne = (req, res) => {
    if (!req.params.todoid) {
        sendJSONResponse(res, 404, { 'message': 'todoid is required' });
        return;
    }
    todo
        .findById(req.params.todoid)
        .exec((err, tododata) => {
            if (!tododata) {
                sendJSONResponse(res, 404, { 'message': 'no tododata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            tododata.name = req.body.name;
            tododata.gid = req.body.gid;
            // tododata.list = req.body.list;
            tododata.save((err, tododata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, tododata);
                }
            });
        });
};

const todoDeleteOne = (req, res) => {
    const todoid = req.params.todoid;
    if (todoid) {
        todo
            .findByIdAndRemove(todoid)
            .exec((err, tododata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
    } else {
        sendJSONResponse(res, 404, { 'message': 'todoid is required' });
    }
};

module.exports = {
    todoListAll,
    todoCreate,
    todoReadOne,
    todoUpdateOne,
    todoDeleteOne
};