// src/composables/useEditorApiClient.js
import { inject } from 'vue'
import { createEditorApiClient } from '../services/editorApiBase'

export function useEditorApiClient() {
    const config = inject('EditorWidgetConfig')

    if (!config || !config.apiUrl || !config.apiKey) {
        throw new Error('[EditorWidget] API config is missing or invalid')
    }

    return createEditorApiClient(config.apiUrl, config.apiKey)
}