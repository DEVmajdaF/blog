const express = require('express');
const { createPost,getAllCategPost,deletePost,getPostById} = require('../controller/postController');

const router = express.Router();


router.route('/').post(createPost).get(getAllCategPost);
router.route('/:postId').get(getPostById).delete(deletePost);
//router.route('/category/:category').get(getPostByCateg);
//router.route('/categ').get(getAllCategPost);

module.exports = router;