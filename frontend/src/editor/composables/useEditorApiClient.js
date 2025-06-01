/**
*
* Checks wether the API-Key has been configured in
*
* EditorWidget.mountEditorApp('#editor-widget', {
*        apiUrl: 'http://localhost:8000',
*        apiKey: '12345678'
*    });
*
* Creates a new Editor-API-Client if successful.
*
*/
import { inject } from 'vue'
import { createEditorApiClient } from '../services/editorApiBase'

export function useEditorApiClient() {
    const config = inject('EditorWidgetConfig')

    if (!config.apiKey) {
        alert("Bitte den API-Key in die Konfiguration eintragen!")
        throw new Error('[EditorWidget] API config is missing or invalid')
    }

    return createEditorApiClient(config.apiUrl, config.apiKey)
}