// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import DummyUser from '../media/dummy-profile.jpg';
// import { useUser } from '../../context/ContextContainer';

// export default function ProfileSidebar({ isOpen, onClose }) {

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })
//   const { user } = useUser();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log('Submitting:', formData)
//   }

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     })
//   }


//   return (
//     <>


//  <div
//       className={`fixed top-0 right-0 w-64 h-full bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50
//         ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
//     >
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h2 className="text-lg font-semibold">Edit Profile</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-red-500">✖</button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
//           <div className="flex justify-center">
//             <input
//             type="file"
//             name="name"
//             placeholder="Name"
//             className="w-full border px-3 py-2 rounded"
//             value={user.profileImage}
//             onChange={handleChange}
//           />
//           </div>

//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="w-full border px-3 py-2 rounded"
//             value={user.name}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full border px-3 py-2 rounded"
//             value={user.email}
//             onChange={handleChange}
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             className="w-full border px-3 py-2 rounded"
//             value={user.phone}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="currentPassword"
//             placeholder="Current Password"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.currentPassword}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="newPassword"
//             placeholder="New Password"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.newPassword}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="w-full border px-3 py-2 rounded"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />

//           <div className="flex gap-2 justify-between">
//             <button type="submit" className="w-1/2 bg-green-600 text-white py-2 rounded">Submit</button>
//             <button type="button" onClick={handleReset} className="w-1/2 bg-gray-300 text-black py-2 rounded">Reset</button>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }



'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import DummyUser from '../media/dummy-profile.jpg'
import { useUser } from '../../context/ContextContainer'

export default function ProfileSidebar({ isOpen, onClose }) {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [profileImageFile, setProfileImageFile] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setPreviewImage(user.profileImage || DummyUser.src)
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImageFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('phone', formData.phone)
    form.append('currentPassword', formData.currentPassword)
    form.append('newPassword', formData.newPassword)
    form.append('confirmPassword', formData.confirmPassword)
    if (profileImageFile) {
      form.append('profileImage', profileImageFile)
    }

    const res = await fetch('/api/user/update', {
      method: 'PUT',
      body: form,
    })

    const data = await res.json()
    if (res.ok) {
      alert('Profile updated successfully')
    } else {
      alert(data.message || 'Something went wrong')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setPreviewImage(user?.profileImage || DummyUser.src)
    setProfileImageFile(null)
  }

  return (
    <div className={`fixed top-0 right-0 w-64 h-full bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <button onClick={onClose} className="text-black-300 hover:text-red-500">✖</button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
        <div className="flex justify-center">
          <label className="cursor-pointer">
            <Image src={previewImage || DummyUser} width={100} height={100} alt="Profile Preview" className="rounded-full border" />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <input type="text" name="name" placeholder="Name" className="w-full border px-3 py-2 rounded text-black" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full border px-3 py-2 rounded text-black" value={formData.email} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" className="w-full border px-3 py-2 rounded text-black" value={formData.phone} onChange={handleChange} />
        <input type="password" name="currentPassword" placeholder="Current Password" className="w-full border px-3 py-2 rounded text-black" value={formData.currentPassword} onChange={handleChange} />
        <input type="password" name="newPassword" placeholder="New Password" className="w-full border px-3 py-2 rounded text-black" value={formData.newPassword} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border px-3 py-2 rounded text-black" value={formData.confirmPassword} onChange={handleChange} />

        <div className="flex gap-2 justify-between">
          <button type="submit" className="w-1/2 bg-green-600 text-white py-2 rounded">Submit</button>
          <button type="button" onClick={handleReset} className="w-1/2 bg-gray-300 text-black py-2 rounded">Reset</button>
        </div>
      </form>
    </div>
  )
}
