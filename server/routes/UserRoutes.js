const express = require('express');
const router = express.Router();
const { UserDetails } = require('../controllers/UserController');

router.post('/userDetail', UserDetails);

module.exports = router;