// Importiere die createApp-Funktion aus dem Vue-Framework
import { createApp } from 'vue';

// Importiere die Hauptkomponente der Anwendung aus der App.vue-Datei
import App from './App.vue';

// Erstelle eine neue Vue-Anwendung mit der Hauptkomponente App
const app = createApp(App);

// Binde die Anwendung an das DOM-Element mit der ID 'app'
// Dies sorgt dafür, dass die Vue-Anwendung innerhalb dieses Elements gerendert wird
app.mount('#app');


//Dieser Code importiert die notwendigen Module,
// erstellt eine neue Vue-Anwendung basierend auf der
// Hauptkomponente App und bindet diese
// an das DOM-Element mit der ID #app.
// Dadurch wird die Anwendung im entsprechenden
// Bereich der HTML-Seite gerendert.