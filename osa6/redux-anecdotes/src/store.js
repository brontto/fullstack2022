import { configureStore } from '@reduxjs/toolkit'

import anectodetReducer from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
        anecdotes: anectodetReducer
    }
})

export default store
