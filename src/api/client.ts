import axios from 'axios'

export const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_URL + '/api',
  headers: { 'Accept': 'application/json' },
  timeout: 10000,
})
