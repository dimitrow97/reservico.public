import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from "./api/api-slice"
import { persistStore, persistReducer } from 'redux-persist'
import authReducer from '../features/auth/auth-slice'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    storage: storageSession,
  }

const rootReducer = combineReducers({ 
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
})
  
const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)