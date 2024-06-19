const express = require('express');
const { getAllCategories, getcategoryById, deleteCategory, createcategory,updateCategorie} = require('../controller/categoriController');

const router = express.Router();


router.route('/').get(getAllCategories).post(createcategory)
router.route('/:categoryId').get(getcategoryById).put(updateCategorie).delete(deleteCategory);

module.exports = router;