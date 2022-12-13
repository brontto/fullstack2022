import { createSlice } from '@reduxjs/toolkit'

const notifiactionReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }

    }
})

export const { showNotification, clearNotification } = notifiactionReducer.actions

let timeoutID



export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(showNotification(notification))

        if (timeoutID) {
            clearTimeout(timeoutID)
        }

        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notifiactionReducer.reducer

