/*
 * Author: David Shefcik
 * Created: 11/22/19
 * Project | File: Spotify Queue Client | src/modules/redux/reducers/root.js
 */

// Module imports
import { combineReducers } from 'redux'

// Reducer imports
import userReducer from './userReducer'
import tokenReducer from './tokenReducer'

// Combine reducers
const root = combineReducers({
  user: userReducer,
  token: tokenReducer
})

// Export
export default root
