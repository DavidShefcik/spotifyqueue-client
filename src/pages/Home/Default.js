/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/pages/Home/Default.js
 */

// Module imports
import React from 'react'
import { Link } from 'react-router-dom'

// CSS imports
import styles from './css/Default.css'

// Component props
import Button from '../../components/Button'

// Component
const Default = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textArea}>
          <p className={styles.title}>Queue for Spotify</p>
          <p className={styles.subtitle}>
            Share a queue without passing around the device.
          </p>
        </div>
        <div>
          <Link to="/login" title="Log In">
            <Button text="Log In" action={() => {}} />
          </Link>
        </div>
        <div>
          <Button text="Join a Session" action={() => window.alert('Hello!')} />
        </div>
      </div>
    </div>
  )
}

// Export
export default Default
