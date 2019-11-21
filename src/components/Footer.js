/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/components/Footer.js
 */

// Module imports
import React from 'react'
import { Link } from 'react-router-dom'

// CSS imports
import styles from './css/Footer.css'

// Component
const Footer = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <a
            href="https://github.com/DavidShefcik/spotifyqueue-client"
            title="Github"
            target="_blank"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://davidshefcik.com"
            title="David Shefcik"
            target="_blank"
          >
            David Shefcik
          </a>
        </li>
      </ul>
    </div>
  )
}

// Export
export default Footer
