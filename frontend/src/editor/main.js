import { createApp } from 'vue'
import App from './App.vue'

// BootstrapVueNext
import { BootstrapVueNext, BButton } from 'bootstrap-vue-next'

import { createPinia } from 'pinia'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '../shared/assets/main.css'

export function mountEditorApp(targetSelector = '#editor-widget', config = {}) {
    const app = createApp(App)
    const pinia = createPinia()

    app.use(BootstrapVueNext)
    app.use(pinia)
    app.component('BButton', BButton)

    // Editor-spezifisches Config-Objekt bereitstellen
    app.provide('EditorWidgetConfig', config)

    const target = document.querySelector(targetSelector)
    if (!target) {
        console.error(`[EditorWidget] Mount target '${targetSelector}' not found.`)
        return
    }

    app.mount(target)
}