import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
        <h1 className='text-white text-[60px]'><span className='text-indigo-600'>404</span> - Page Not Found</h1>
        <Link to={'/'} className='py-2 px-3 bg-indigo-600 text-white rounded mt-6 text-xl'>Return to home</Link>
    </div>
  )
}

export default NotFound