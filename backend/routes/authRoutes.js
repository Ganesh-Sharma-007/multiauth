const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);



router.get('/admin'.protect, authorize('admin'), (req, res) => {
    res.send('Admin Dashboard')
});

module.exports = router;

