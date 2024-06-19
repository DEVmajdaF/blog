const express = require('express');
const { getAllUser, getUserById, deleteUser, postUser,updateUser} = require('../controller/userController');

const router = express.Router();


router.route('/').get(getAllUser).post(postUser)
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;