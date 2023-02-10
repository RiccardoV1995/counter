import axios from 'axios'

const URL = '/api/counters'

const getCounterFnc = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(`${URL}/${id}`, config)

    return res.data
}

const counterServices = {
    getCounterFnc
}

export default counterServices