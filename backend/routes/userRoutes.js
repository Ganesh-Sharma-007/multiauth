// const express = require('express')
// const router = express.Router()
// const { protect } = require('../middleware/authMiddleware')
// const { updateUserProfile } = require('../controllers/userController')
// const multer = require('multer')
// const path = require('path')

// // Setup multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/profile_images/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })

// const upload = multer({ storage })

// router.put('/update', protect, upload.single('profileImage'), updateUserProfile)

// module.exports = router
