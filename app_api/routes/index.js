const express = require('express');
const router = express.Router();
const cltruser = require('../controllers/user');
const cltrgroup = require('../controllers/group');

// image items
router
    .route('/user')
    .get(cltruser.userListAll)
    .post(cltruser.userCreate);
router
    .route('/user/:userid')
    .get(cltruser.userReadOne)
    .put(cltruser.userUpdateOne)
    .delete(cltruser.userDeleteOne);

router
    .route('/group')
    .get(cltrgroup.groupListAll)
    .post(cltrgroup.groupCreate);
router
    .route('/group/:groupid')
    .get(cltrgroup.groupReadOne)
    .put(cltrgroup.groupUpdateOne)
    .delete(cltrgroup.groupDeleteOne);

module.exports = router;