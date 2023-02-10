import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import userServices from './userServices'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('/user/login', async (userData, thunkAPI) => {
    try {
        return await userServices.loginFnc(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('/user/logout', async () => {
    await userServices.logoutFnc()
})

export const register = createAsyncThunk('/user/register', async (userData, thunkAPI) => {
    try {
        return await userServices.registerFnc(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const update = createAsyncThunk('/user/update', async (userData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await userServices.updateFnc(userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updatePassword = createAsyncThunk('/user/update-password', async (passwordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await userServices.updatePasswordFnc(passwordData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const remove = createAsyncThunk('/user/remove', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await userServices.deleteFnc(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message) 
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(remove.pending, (state) => {
                state.isLoading = true
            })
            .addCase(remove.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer