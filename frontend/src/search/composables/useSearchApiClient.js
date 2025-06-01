/**
 * Creates a new Search-API-Client with provided api-parameters.
 */
import { inject } from 'vue'
import { createSearchApiClient } from '../services/searchApiBase'

export function useSearchApiClient() {
    const config = inject('SearchWidgetConfig')
    return createSearchApiClient(config.apiUrl)
}