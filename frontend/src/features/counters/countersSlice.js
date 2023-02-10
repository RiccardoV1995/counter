import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import countersServices from './countersServices'

const initialState = {
    counters: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getAllCounters = createAsyncThunk('/counters/getallcounters', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await countersServices.getAllCountersFnc(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const createCounter = createAsyncThunk('/counters/create', async (counterData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await countersServices.createCounterFnc(counterData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteCounter = createAsyncThunk('/counters/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await countersServices.deleteCounterFnc(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateCounter = createAsyncThunk('/counters/update', async ({id, counterData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await countersServices.updateCounterFnc(id, counterData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const countersSlice = createSlice({
    name: 'counters',
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
            .addCase(getAllCounters.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCounters.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllCounters.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.counters = action.payload
            })
            .addCase(createCounter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCounter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createCounter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.counters.push(action.payload)
            })
            .addCase(deleteCounter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCounter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCounter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.counters = state.counters.filter(e => e._id !== action.payload._id)
            })
            .addCase(updateCounter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCounter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateCounter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.counters = state.counters.map(e => e._id === action.payload._id ? action.payload : e)
            })
    }
})

export const {reset} = countersSlice.actions
export default countersSlice.reducer