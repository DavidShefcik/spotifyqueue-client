/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/modules/axios/index.js
 */

// Module imports
import axios from 'axios'

console.log(process.env.API)

// Config
const axiosConfig = axios.create({
  baseURL: process.env.API,
  timeout: 5000
})

// Export
export default axiosConfig
