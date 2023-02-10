import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

import {createCounter, reset} from '../features/counters/countersSlice'

import Sidebar from '../components/Sidebar'

const CreateCounter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess, isError, message, isLoading} = useSelector(state => state.counters)

  useEffect(() => {
    dispatch(reset())
  }, [dispatch, isSuccess, navigate])

  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const counterDate = {
      date,
      name,
    }

    dispatch(createCounter(counterDate))
    navigate('/dashboard')
  }

  if (isLoading) {
    return (<h1 className='absolute top-1/2 left-1/2 text-white text-2xl'>Loading...</h1>)
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
              Create New Count
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
                  value={date}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateCounter