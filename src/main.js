// Importiere die createApp-Funktion aus dem Vue-Framework
import { createApp } from 'vue'

// Importiere die Hauptkomponente der Anwendung aus der App.vue-Datei
import App from './App.vue'

// -------------------- Vuetify-Integration --------------------

// Importiere die Vuetify-Styles (Pflicht für das Design!)
import 'vuetify/styles'

// Optional: Material Design Icons (z.B. für Buttons oder Stepper-Symbole)
import '@mdi/font/css/materialdesignicons.css'

// Importiere die Funktion zum Erstellen einer Vuetify-Instanz
import { createVuetify } from 'vuetify'

// Importiere alle Vuetify-Komponenten und Direktiven
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Erstelle die Vuetify-Instanz mit allen Komponenten und Direktiven
const vuetify = createVuetify({
  components,
  directives,
})

// -------------------- Anwendung starten --------------------

// Erstelle eine neue Vue-Anwendung basierend auf der Hauptkomponente App
const app = createApp(App)

// Verwende Vuetify als Plugin innerhalb der Vue-Anwendung
app.use(vuetify)

// Binde die Anwendung an das DOM-Element mit der ID 'app'
// Dies sorgt dafür, dass die Vue-Anwendung innerhalb dieses Elements gerendert wird
app.mount('#app')

// -----------------------------------------------------------
// Dieser Code sorgt dafür, dass Vuetify vollständig integriert ist:
//  → Styling
//  → Icons
//  → Komponenten wie v-container, v-stepper, v-select usw.