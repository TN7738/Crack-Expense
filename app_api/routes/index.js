const express = require('express');
const router = express.Router();
const cltruser = require('../controllers/user');
const cltrgroup = require('../controllers/group');
const cltrexpense = require('../controllers/expense');

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

router
    .route('/expense')
    .get(cltrexpense.expenseListAll)
    .post(cltrexpense.expenseCreate);
router
    .route('/expense/:expenseid')
    .get(cltrexpense.expenseReadOne)
    .put(cltrexpense.expenseUpdateOne)
    .delete(cltrexpense.expenseDeleteOne);

module.exports = router;