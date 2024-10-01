const router = require('express').Router();
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/user');

// GET request to retrieve users
router.get('/users', getUsers);

// POST request to add a new user
router.post('/add-user', addUser);

// DELETE request to remove a user by ID
router.delete('/delete-user/:id', deleteUser);

// PATCH request to update a user by ID
router.patch('/update-user/:id', updateUser);

module.exports = router;
