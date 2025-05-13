// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
// const fs = require('fs')
// const path = require('path')

// exports.updateUserProfile = async (req, res) => {
//   const userId = req.user._id
//   const { name, email, phone, currentPassword, newPassword, confirmPassword } = req.body

//   try {
//     const user = await User.findById(userId)
//     if (!user) return res.status(404).json({ message: 'User not found' })

//     // Handle password update
//     if (currentPassword || newPassword || confirmPassword) {
//       const isMatch = await bcrypt.compare(currentPassword, user.password)
//       if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' })
//       if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })

//       user.password = await bcrypt.hash(newPassword, 10)
//     }

//     // Handle image update
//     if (req.file) {
//       user.profileImage = `/uploads/profile_images/${req.file.filename}`
//     }

//     user.name = name || user.name
//     user.email = email || user.email
//     user.phone = phone || user.phone

//     await user.save()
//     res.json({ message: 'Profile updated successfully', user })

//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }
