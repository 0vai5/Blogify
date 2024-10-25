const express = require('express');
const router = express.Router();
const { CreateBlog, DeleteBlog, GetBlog, GetAllBlogs } = require('../controllers/BlogController');

router.post('/createBlog', CreateBlog);
router.post('/deleteBlog', DeleteBlog);
router.get('/GetBlog', GetBlog);
router.get('/getAllBlogs', GetAllBlogs);

module.exports = router;
