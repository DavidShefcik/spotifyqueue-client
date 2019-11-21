/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/pages/Home/Default.js
 */

// Module imports
import React from 'react'

// CSS imports
import styles from './css/Default.css'

// Component props
import Button from '../../components/Button'

// Component
const Default = () => {
  return (
    <div>
      <Button text="Alert" action={() => window.alert('Hello!')} />
    </div>
  )
}

// Export
export default Default
