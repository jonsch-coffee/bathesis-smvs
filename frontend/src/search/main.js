import { createApp } from 'vue'
import App from './App.vue'
// BootstrapVueNext
import { BootstrapVueNext, BButton } from 'bootstrap-vue-next'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '../shared/assets/main.css'

export function mountSearchApp(targetSelector = '#search-widget', config = {}) {
    const app = createApp(App)

    app.use(BootstrapVueNext) // oder createBootstrap(), beides geht
    app.component('BButton', BButton)
    app.provide('SearchWidgetConfig', config)

    const target = document.querySelector(targetSelector)
    if (!target) {
        console.error(`[SearchWidget] Mount target '${targetSelector}' not found.`)
        return
    }

    app.mount(targetSelector)
}