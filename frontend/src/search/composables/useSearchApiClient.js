// src/composables/useEditorApiClient.js
import { inject } from 'vue'
import { createSearchApiClient } from '../services/searchApiBase'

export function useSearchApiClient() {
    const config = inject('SearchWidgetConfig')

    if (!config || !config.apiUrl) {
        throw new Error('[SearchWidget] API config is missing or invalid')
    }

    return createSearchApiClient(config.apiUrl)
}