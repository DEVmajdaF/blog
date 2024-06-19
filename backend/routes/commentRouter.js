const express = require('express');
const {  updateComment,deleteComment, createComment} = require('../controller/commentController');

const router = express.Router();


router.route('/').post(createComment)
router.route('/:commentId').put(updateComment).delete(deleteComment);

module.exports = router;