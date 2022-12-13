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

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(showNotification(notification))

        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notifiactionReducer.reducer

