import React from 'react'
import {Link} from 'react-router-dom'

import Navbar from '../components/Navbar'

const Index = () => {
  return (
    <>
        <Navbar />
        <h1 className='mx-auto text-5xl text-gray-200 text-center mt-4'>Counter App</h1>
        <h4 className='mx-auto sm:text-lg text-base text-gray-200 text-center mt-4'>Una semplice applicazione per il conto alla rovescia</h4>
        <div className='flex text-center justify-center items-center bg-zinc-900'>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>00</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Giorni</h4>
                </div>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>00</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Ore</h4>
                </div>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>00</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Minuti</h4>
                </div>
                <div className='sm:w-48 w-20 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>00</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Secondi</h4>
                </div>
            </div>
        <p className='text-center text-gray-200 sm:mt-12 mt-4 sm:text-lg px-4'><Link to={'/register'} className='text-indigo-500'>Crea</Link> un account o <Link to={'/login'} className='text-indigo-500'>Accedi</Link> al tuo per iniziare a creare i tuoi conti alla rovescia.</p>
    </>
  )
}

export default Index