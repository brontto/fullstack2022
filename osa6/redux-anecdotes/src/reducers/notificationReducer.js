import { createSlice } from '@reduxjs/toolkit'

const notifiactionReducer = createSlice({
    name: 'notification',
    initialState: 'This is a notification',
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notifiactionReducer.actions

export default notifiactionReducer.reducer