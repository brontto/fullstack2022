import { createSlice } from '@reduxjs/toolkit'

const notifiactionReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }

    }
})

export const { setNotification, clearNotification } = notifiactionReducer.actions

export default notifiactionReducer.reducer

