/*
 * Author: David Shefcik
 * Created: 11/22/19
 * Project | File: Spotify Queue Client | src/modules/redux/reducers/tokenReducer.js
 */

// Type imports
import { SET_TOKEN, REMOVE_TOKEN } from '../actions/types'

// Initial state
const initialState = {
  token: {}
}

// Evaluate
const evaluate = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case REMOVE_TOKEN:
      return {
        ...state,
        token: {}
      }
    default:
      return state
  }
}

// Export
export default evaluate
