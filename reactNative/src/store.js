import { configureStore } from '@reduxjs/toolkit'
import routeSlice from './slices/routes/routeSlice'
import userSlice from './slices/users/userSlice'

export const store = configureStore({
    reducer: {
        routes:routeSlice,
        users:userSlice
        },
    })
