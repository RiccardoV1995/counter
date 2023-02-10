import axios from 'axios'

const URL = '/api/counters/'

const getAllCountersFnc = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(URL, config)

    return res.data
}

const createCounterFnc = async (counterData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(URL, counterData, config)

    return res.data
}

const deleteCounterFnc = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(`${URL}${id}`, config)

    return res.data
}

const updateCounterFnc = async (id, counterData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(`${URL}${id}`, counterData, config)

    return res.data
}

const countersServices = {
    getAllCountersFnc,
    createCounterFnc,
    deleteCounterFnc,
    updateCounterFnc,
}

export default countersServices