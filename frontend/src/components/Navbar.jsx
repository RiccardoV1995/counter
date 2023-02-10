import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.user)

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

  return (
    <nav className='flex w-full h-16 py-4 px-8 justify-between items-cente'>
       <Link to={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
       </Link>
       <ul className='flex'>
            <li className='mx-3'>
                <Link to={'/login'}>
                    <h4 className='text-lg text-gray-200'>Login</h4>
                </Link>
            </li>
            <li>
                <Link to={'/register'}>
                    <h4 className='text-lg text-gray-200'>Register</h4>
                </Link>
            </li>
       </ul>
    </nav>
  )
}

export default Navbar