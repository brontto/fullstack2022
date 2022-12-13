import { configureStore } from '@reduxjs/toolkit'

import anectodetReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        anecdotes: anectodetReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store
