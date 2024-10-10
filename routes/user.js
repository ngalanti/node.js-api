const router = require('express').Router();
const { getUsers, addUser, updateUser, deleteUser, signUp } = require('../controllers/user');

router.post('/sign-up', signUp);

module.exports = router;
