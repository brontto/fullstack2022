import { configureStore } from '@reduxjs/toolkit'

import anectodetReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        anecdotes: anectodetReducer,
        notification: notificationReducer
    }
})

export default store
