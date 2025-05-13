// apis/api.js
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes')

const router = express.Router();
router.use('/auth', authRoutes);
// router.use('/user', userRoutes)
module.exports = router;
