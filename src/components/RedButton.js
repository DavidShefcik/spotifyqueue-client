/*
 * Author: David Shefcik
 * Created: 11/25/19
 * Project | File: Spotify Queue Client | src/components/RedButton.js
 */

// Module imports
import React from 'react'

// CSS imports
import styles from './css/RedButton.css'

// Component
const RedButton = props => {
  return (
    <div className={styles.container} title={props.text} onClick={props.action}>
      <p>{props.text}</p>
    </div>
  )
}

// Export
export default RedButton
