import axios from 'axios'

export function createEditorApiClient(apiUrl, apiKey) {
    return axios.create({
        baseURL: apiUrl,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}` // << Schlüsselzeile
        }
    })
}