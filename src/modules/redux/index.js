/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/modules/redux/index.js
 */

// Module imports
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

// Reducer imports
import root from './reducers/root'

// Variables
const initialState = {}
const middleware = [thunk]

// Cookie options
Cookies.defaults.expires = 30
Cookies.defaults.path = '/'
Cookies.defaults.domain = process.env.COOKIE_DOMAIN
Cookies.defaults.secure = true

// Config
const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
const persistConfig = {
  key: 'primary',
  storage: new CookieStorage(Cookies)
}
const persistedReducer = persistReducer(persistConfig, root)

// Store
let store
if (process.env.PRODUCTION === 'false') {
  store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(compose(applyMiddleware(...middleware)))
  )
} else {
  store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}

// Persistor
let persistor = persistStore(store, {})

// Export
export default () => {
  return { store, persistor }
}
