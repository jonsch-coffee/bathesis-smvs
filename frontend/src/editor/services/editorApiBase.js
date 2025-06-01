import axios from 'axios'

/**
 * Create a new axios-instance which uses the configured api-key
 * @param apiUrl
 * @param apiKey
 * @returns {AxiosInstance}
 */
export function createEditorApiClient(apiUrl, apiKey) {
    return axios.create({
        baseURL: apiUrl,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}` // << API-Key assigned in widget-configuration. See composables/useEditorApiClient.js
        }
    })
}