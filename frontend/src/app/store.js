import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import authApi from './api/authApi'
import postApi from './api/postApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer
  },
  // TODO WHAT
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

export default store
