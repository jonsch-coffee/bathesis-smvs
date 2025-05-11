import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// BootstrapVueNext
import { BootstrapVueNext, BModal, BButton } from 'bootstrap-vue-next'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/assets/main.css'

const app = createApp(App)

app.use(router)
app.use(BootstrapVueNext) // oder createBootstrap(), beides geht

// Optional: manuelle globale Registrierung
app.component('BModal', BModal)
app.component('BButton', BButton)

app.mount('#app')