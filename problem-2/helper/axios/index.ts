import axios from 'axios'
export const baseURL = 'https://interview.switcheo.com'
export const api = axios.create({
  baseURL
})
