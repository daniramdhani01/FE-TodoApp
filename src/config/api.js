import axios from 'axios'

export const API = axios.create({
    baseURL: 'https://be-todoapp.herokuapp.com/api/v1',
})