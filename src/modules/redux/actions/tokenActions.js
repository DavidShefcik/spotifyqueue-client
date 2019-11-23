/*
 * Author: David Shefcik
 * Created: 11/22/19
 * Project | File: Spotify Queue Client | src/modules/redux/actions/tokenActions.js
 */

// Type imports
import { SET_TOKEN, REMOVE_TOKEN } from './types'

// Set user action
export const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  })
}

// Remove user action
export const removeToken = () => dispatch => {
  dispatch({
    type: REMOVE_TOKEN
  })
}
