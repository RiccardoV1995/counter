import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import counterServices from './counterServices'

const initialState = {
    counter: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getCounter = createAsyncThunk('/counter/getcounter', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token

        return await counterServices.getCounterFnc(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const counterSlice = createSlice({
    name: 'counter',
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
            .addCase(getCounter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCounter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCounter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.counter = action.payload
            })
    }
})

export const {reset} = counterSlice.actions
export default counterSlice.reducer