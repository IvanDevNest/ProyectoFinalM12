import { configureStore } from '@reduxjs/toolkit'
import routeSlice from './slices/routes/routeSlice'


export const store = configureStore({
    reducer: {
        routes:routeSlice
        },
    })
