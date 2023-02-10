import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {update, reset, updatePassword, remove} from '../features/user/userSlice'

import Sidebar from '../components/Sidebar'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(reset())
  }, [])

  const {user, isLoading, isError, message} = useSelector(state => state.user)

  const [username, setUsename] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!username || !email) {
      return toast.error('All profile fields must not be empty')
    }

    const userData = {
      username,
      email
    }

    dispatch(update(userData))
    toast.success('User\'s profile updated')
  }

  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error('All password fields must not be empty')
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New password and confirm password not match')
    }

    const passwordData = {
      oldPassword,
      newPassword
    }

    dispatch(updatePassword(passwordData))
    toast.success('Password updated')

    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const onSubmitRemove = (e) => {
    e.preventDefault()

    if (window.confirm('Do you want delete your account?')) {
      dispatch(remove())
      toast.success('Account removed')
      navigate('/')
    }
  } 

  if (isError) {
    return toast.error(message)
  }

  if (!user || isLoading) {
    return (<h1 className='absolute top-1/2 left-1/2 text-white text-2xl'>Loading...</h1>)
  }

  return (
    <>
        <Sidebar />
        <div className='min-h-full min-w-ful my-5 flex items-start justify-center'>
          <div className='grid sm:grid-cols-3 gap-4 lg:w-2/3 mt-16 grid-cols-1'>
            <div className='sm:col-span-2 bg-zinc-700 p-4 rounded-md h-fit col-span-1'>
              <h1 className='text-center text-3xl text-gray-100'>Profile</h1>
              <form onSubmit={onSubmit}>
                <div className="relative mt-3 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {setUsename(e.target.value)}}
                    className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div className="relative mt-3 rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <button type="submit" className='py-2 px-3 bg-indigo-600 text-white mt-3 text-lg rounded-md'>Update user</button>
              </form>
              <button onClick={onSubmitRemove} className='py-2 px-3 bg-red-600 text-white mt-3 text-lg rounded-md'>Delete account</button>
            </div>

            <div className='bg-zinc-700 p-4 rounded-md col-span-1'>
              <h1 className='text-center text-3xl text-gray-100'>Password</h1>
              <form onSubmit={updatePasswordSubmit}>
                <div className="relative mt-3 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="old_password"
                    id="old_password"
                    value={oldPassword}
                    onChange={(e) => {setOldPassword(e.target.value)}}
                    className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Old password"
                  />
                </div>
                <div className="relative mt-3 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="new_password"
                    id="new_password"
                    value={newPassword}
                    onChange={(e) => {setNewPassword(e.target.value)}}
                    className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="New password"
                  />
                </div>
                <div className="relative mt-3 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="confirm_new_password"
                    id="confirm_new_password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
                <button type="submit" className='py-2 px-3 bg-indigo-600 text-white mt-3 text-lg rounded-md'>Update password</button>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default Profile