const express = require('express');
const { googleSignIn, emailPasswordSignIn } = require('../controllers/auth.controller');

const router = express.Router();

//google sign-in
router.post('/google-sign-in', googleSignIn);
router.post('/emailPassSignIn', emailPasswordSignIn);

module.exports = router;