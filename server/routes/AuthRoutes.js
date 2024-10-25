const express = require('express');
const router = express.Router();
const { SignUP, SignIN, SignOut } = require('../controllers/AuthController');

router.post('/signUP', SignUP);
router.post('/signIN', SignIN);
router.get('/signOUT', SignOut);

module.exports = router;
