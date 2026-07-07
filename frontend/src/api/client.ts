import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error(
    'VITE_API_URL is not defined. Copy frontend/.env.example to .env and set it.',
  )
}

/** Shared Axios instance. All API modules import this — no direct axios use in UI. */
export const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})
