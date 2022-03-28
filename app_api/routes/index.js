const express = require('express');
const router = express.Router();
const cltruser = require('../controllers/user');
const cltrgroup = require('../controllers/group');
const cltrexpense = require('../controllers/expense');
const cltrtodo = require('../controllers/todo');

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

router
    .route('/todo')
    .get(cltrtodo.todoListAll)
    .post(cltrtodo.todoCreate);
router
    .route('/todo/:todoid')
    .get(cltrtodo.todoReadOne)
    .put(cltrtodo.todoUpdateOne)
    .delete(cltrtodo.todoDeleteOne);

module.exports = router;