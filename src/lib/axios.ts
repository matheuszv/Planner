import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://nlw-journey-nodejs-7l9tkbkda-matheus-vinagres-projects.vercel.app:3333'
})