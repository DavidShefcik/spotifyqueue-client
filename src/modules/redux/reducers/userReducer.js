/*
 * Author: David Shefcik
 * Created: 11/22/19
 * Project | File: Spotify Queue Client | src/modules/redux/reducers/userReducer.js
 */

// Type imports
import { SET_USER, REMOVE_USER } from '../actions/types'

// Initial state
const initialState = {
  user: {}
}

// Evaluate
const evaluate = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case REMOVE_USER:
      return {
        ...state,
        user: {}
      }
    default:
      return state
  }
}

// Export
export default evaluate
