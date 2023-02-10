import {useState, useEffect} from 'react'

import ExpaireTime from './ExpaireTime';

const Counter = ({date = null}) => { 
    const useCountdown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();
      
        const [countDown, setCountDown] = useState(
          countDownDate - new Date().getTime()
        );
      
        useEffect(() => {
            const interval = setInterval(() => {
              setCountDown(countDownDate - new Date().getTime());
            }, 1000);
        
            return () => clearInterval(interval);
          }, [countDownDate]);
        
          return getReturnValues(countDown);
        };

        const getReturnValues = (countDown) => {
            // calculate time left
            const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
          
            return [days, hours, minutes, seconds];
          };

          const [days, hours, minutes, seconds] = useCountdown(date);

          if (days + hours + minutes + seconds <= 0) {
            return <ExpaireTime />;
          }
    
  return (
    <>
        {date ? (
            <div className='flex text-center justify-center items-center bg-zinc-900'>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>{days}</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Giorni</h4>
                </div>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>{hours}</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Ore</h4>
                </div>
                <div className='sm:w-48 w-20 sm:mr-16 mr-2 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>{minutes}</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Minuti</h4>
                </div>
                <div className='sm:w-48 w-20 flex flex-col justify-center items-center'>
                    <div className='sm:text-[180px] text-gray-200 text-[50px]'>{seconds}</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Secondi</h4>
                </div>
            </div>
        ) : (
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
                    <div className='sm:text-[180px] text-gray-200 text-[80px]'>00</div>
                    <h4 className='sm:text-[60px] text-xl text-gray-200 relative sm:bottom-8 bottom-4'>Secondi</h4>
                </div>
            </div>
        )}
        
    </>
  )
}

export default Counter