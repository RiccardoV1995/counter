import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import {getCounter, reset} from '../features/counter/counterSlice'

import Counter from '../components/Counter'
import Sidebar from '../components/Sidebar'

const SingleCounter = () => {
  const {id} = useParams()

  const dispatch = useDispatch()

  const {counter, isLoading, isError, message} = useSelector(state => state.counter)

  useEffect(() => {
    dispatch(reset)
    dispatch(getCounter(id))
  }, [])

  if (isError) {
    return toast.error(message)
  }

  if (isLoading || !counter) {
    return (<h1 className='absolute top-1/2 left-1/2 text-white text-2xl -translate-x-1/2 -translate-y-1/2'>Loading...</h1>)
  }

  return (
    <>
        <Sidebar />
        <div className='min-h-full min-w-ful flex justify-center items-center my-5 flex-col'>
            <h1 className='text-white text-[80px] font-semibold'>{counter.name}</h1>
            <Counter date={counter.date}/>
        </div>
    </>
  )
}

export default SingleCounter