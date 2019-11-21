/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/components/Button.js
 */

// Module imports
import React from 'react'

// CSS imports
import styles from './css/Button.css'

// Component
const Button = props => {
  return (
    <div className={styles.container} title={props.text} onClick={props.action}>
      <p>{props.text}</p>
    </div>
  )
}

// Export
export default Button
