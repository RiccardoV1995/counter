import axios from 'axios'

const URL = '/api/users'

const loginFnc = async (userData) => {
    const res = await axios.post(URL + '/login', userData)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const logoutFnc = () => {
    localStorage.removeItem('user')
}

const registerFnc = async (userData) => {
    const res = await axios.post(URL, userData)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const updateFnc = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(URL, userData, config)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const updatePasswordFnc = async (passwordData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(URL + '/password-update', passwordData, config)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const deleteFnc = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(URL, config)

    if (res.data.message) {
        localStorage.removeItem('user')
    }

    return res.data.message
}

const userServices = {
    loginFnc,
    logoutFnc,
    registerFnc,
    updateFnc,
    updatePasswordFnc,
    deleteFnc,
}

export default userServices