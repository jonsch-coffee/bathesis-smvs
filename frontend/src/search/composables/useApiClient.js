// src/search/composables/useApiClient.js
import { inject } from 'vue'
import { createApiClient } from '../services/apiBase'

export function useApiClient() {
    const config = inject('SearchWidgetConfig', { apiUrl: '' })
    return createApiClient(config.apiUrl)
}