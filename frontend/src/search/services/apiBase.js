// src/services/apiClient.js
import axios from 'axios'

export function createApiClient(apiUrl) {
    return axios.create({
        baseURL: apiUrl,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
}