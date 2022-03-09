const express = require('express');
const router = express.Router();
const cntrlImages = require('../controllers/user');

// image items
router
    .route('/user')
    .get(cntrlImages.userListAll)
    .post(cntrlImages.userCreate);
router
    .route('/user/:userid')
    .get(cntrlImages.userReadOne)
    .put(cntrlImages.userUpdateOne)
    .delete(cntrlImages.userDeleteOne);

module.exports = router;