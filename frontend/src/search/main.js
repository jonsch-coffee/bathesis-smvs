import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// BootstrapVueNext
import { BootstrapVueNext, BButton } from 'bootstrap-vue-next'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '../shared/assets/main.css'

//const app = createApp(App)



//app.mount('#search')

export function mountSearchApp(targetSelector = '#search-widget', config = {}) {
    const app = createApp(App)

    app.use(router)
    app.use(BootstrapVueNext) // oder createBootstrap(), beides geht
    app.component('BButton', BButton)
    app.provide('SearchWidgetConfig', config)

    app.mount(targetSelector)
}