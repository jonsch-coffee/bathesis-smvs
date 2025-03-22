<!-- Umschalt-Komponente zum Testen und Vergleichen mehrerer Stepper-Varianten mit Vuetify -->
<template>
    <!-- v-container sorgt für zentriertes Layout mit Innenabstand (pa-4 = padding all 4) -->
    <v-container class="pa-4">
      <!-- Überschrift der Testumgebung, text-h5 ist eine Vuetify-Typografieklasse, mb-4 = margin-bottom 4 -->
      <h2 class="text-h5 mb-4">Stepper-Testumgebung</h2>
  
      <!-- Dropdown-Menü zur Auswahl einer Stepper-Variante -->
      <!-- v-select ist ein Vuetify-Komponenten-Ersatz für native Selects -->
      <!-- v-model: Bindet die Auswahl an selectedStepper -->
      <!-- :items: Array mit verfügbaren Stepper-Optionen -->
      <!-- label: Beschriftung des Dropdowns -->
      <!-- class="mb-6": margin-bottom für Abstand zur nächsten Komponente -->
      <v-select
        v-model="selectedStepper"
        :items="stepperOptions"
        label="Wähle eine Stepper-Variante"
        class="mb-6"
      ></v-select>
  
      <!-- Das ausgewählte Stepper-Komponenten-Element wird hier dynamisch gerendert -->
      <!-- :is erlaubt es, eine Komponente anhand ihres Namens als String anzuzeigen -->
      <component :is="selectedStepper" />
    </v-container>
  </template>
  
  <script>
  // Import der drei Varianten aus dem Unterordner "stepper"
  import VuetifyStepperLinear from './stepper/VuetifyStepperLinear.vue';
  import VuetifyStepperStrict from './stepper/VuetifyStepperStrict.vue';
  import VuetifyStepperVertical from './stepper/VuetifyStepperVertical.vue';
  
  export default {
    name: 'StepperSwitcher',
    components: {
      VuetifyStepperLinear,
      VuetifyStepperStrict,
      VuetifyStepperVertical
    },
    data() {
      return {
        // Initial ausgewählter Stepper-Typ (Standard: linear)
        selectedStepper: 'VuetifyStepperLinear',
        // Optionen für das Dropdown-Menü mit Label und Komponentennamen
        stepperOptions: [
          { title: 'Linear (klickbar)', value: 'VuetifyStepperLinear' },
          { title: 'Strict (nicht klickbar)', value: 'VuetifyStepperStrict' },
          { title: 'Vertikal', value: 'VuetifyStepperVertical' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
/* Aktuell leer, aber du kannst hier z. B. eigene Abstände oder Farben ergänzen */

  </style>
  