import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {logout} from '../features/user/userSlice'

const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const {user} = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const logoutUser = () => {
        dispatch(logout())
        navigate('/')
    }

  return (
    <div id='sidebar' className={`fixed top-0 left-0 h-full w-[300px] bg-indigo-600 z-50 ${show ? 'translate-x-0' : 'translate-x-[-300px]'} transition-transform`}>
        {show ? 
                <button onClick={() => {setShow(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="relative top-4 left-[250px] w-8 h-8 text-gray-200">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            : 
            <button onClick={() => {setShow(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="relative top-4 left-[330px] w-8 h-8 text-gray-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        }
            <ul>
                <li className='mx-3 mt-6 mb-3 px-3 py-2 text-lg text-white hover:bg-black/30 transition rounded'>
                    <Link to={'/create-counter'}>Nuovo counter</Link>
                </li>
                <li className='mx-3 my-3 px-3 py-2 text-lg text-white hover:bg-black/30 transition rounded'>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li className='mx-3 my-3 px-3 py-2 text-lg text-white hover:bg-black/30 transition rounded'>
                    <Link to={'/profile'}>Profilo</Link>
                </li>
            </ul>

            <button onClick={logoutUser} className='absolute bottom-6 left-0 mx-3 px-3 py-2 text-lg text-white hover:text-red-600 transition rounded flex items-center'>
                <h3 className='mr-2'>Logout</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
        
    </div>
  )
}

export default Sidebar