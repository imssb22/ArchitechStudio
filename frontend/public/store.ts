import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './features/counter/counterSlice'
import { authSlice } from './features/auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter : counterSlice.reducer,
        auth : authSlice.reducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']