import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import {getAllCounters, reset} from '../features/counters/countersSlice'

import CounterPreview from '../components/CounterPreview'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const dispatch = useDispatch()

  const {counters, isError, isLoading, message} = useSelector(state => state.counters)

  useEffect(() => {
    dispatch(reset())
    dispatch(getAllCounters())
  }, [dispatch])

  if (isError) {
    return toast.error(message)
  }

  if (isLoading) {
    return (<h1 className='absolute top-1/2 left-1/2 text-white text-2xl -translate-x-1/2 -translate-y-1/2'>Loading...</h1>)
  }
  return (
    <>
        <Sidebar />
        {counters.length > 0 ?
          <div className='min-h-full min-w-ful flex justify-center items-center flex-wrap my-5'>
          {counters.map((counter) => (
            <CounterPreview counter={counter} key={counter._id} />
          ))}
        </div> :
        <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 text-white text-2xl'>No counters find</h1>}
    </>
  )
}

export default Dashboard