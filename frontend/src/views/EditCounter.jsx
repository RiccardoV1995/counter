import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'

import {getCounter, reset} from '../features/counter/counterSlice'
import {updateCounter} from '../features/counters/countersSlice'

import Sidebar from '../components/Sidebar'

const EditCounter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id} = useParams()

  const {counter, isError, message, isLoading} = useSelector(state => state.counter)

  useEffect(() => {
    dispatch(reset())
    dispatch(getCounter(id))
  }, [dispatch, navigate, id])

  useEffect(() => {
    setName(isLoading || !counter ? '' : counter.name)
    setDate(isLoading || !counter ? '' : counter.date)
  }, [isLoading, counter])

  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !date) {
      return toast.error('All fields must not be empty')
    }

    const counterData = {
      name,
      date,
    }

    dispatch(updateCounter({id, counterData}))
    navigate('/dashboard')
  }

  if (isLoading || !counter) {
    return <h1 className='absolute top-1/2 left-1/2 text-white text-2xl -translate-x-1/2 -translate-y-1/2'>Loading...</h1>
  }

  if (isError) {
    return toast.error(message)
  }

  return (
    <>
        <Sidebar />
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
              Edit counter {isLoading || !counter ? '' : counter.name}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Counter name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={(e) => {setName(e.target.value)}}
                  value={name}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Counter name"
                />
              </div>
              <div>
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  onChange={(e) => {setDate(e.target.value)}}
                  value={moment(date).format('YYYY-MM-DD')}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Date"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditCounter