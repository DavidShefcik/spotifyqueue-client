/*
 * Author: David Shefcik
 * Created: 11/22/19
 * Project | File: Spotify Queue Client | src/modules/redux/actions/userActions.js
 */

// Type imports
import { SET_USER, REMOVE_USER } from './types'

// Set user action
export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  })
}

// Remove user action
export const removeUser = () => dispatch => {
  dispatch({
    type: REMOVE_USER
  })
}
