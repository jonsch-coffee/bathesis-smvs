<template>
  <!-- Umschalt-Komponente zum Testen und Vergleichen mehrerer Stepper-Varianten mit Vuetify -->
  <v-container class="pa-4">
    <!-- Titel der Testumgebung -->
    <h2 class="text-h5 mb-4">Stepper-Testumgebung</h2>

    <!-- Dropdown-Menü zur Auswahl einer Stepper-Variante -->
    <!-- v-select ist eine Vuetify-Komponente für Auswahlfelder -->
             <!-- item-title="title"         Gibt an, welches Feld als Label im Dropdown angezeigt wird -->
       <!-- item-value="value"           Gibt an, welches Feld als Wert übergeben wird -->
     <!--   label="Wähle eine Stepper-Variante"   Beschriftung des Auswahlfeldes -->
       <!-- calss="mb-6" -->Abstand nach unten zum Stepper (margin-bottom) -->
    <v-select
      v-model="selectedStepper"
      :items="stepperOptions"
      item-title="title"
      item-value="value"
      label="Wähle eine Stepper-Variante"
      class="mb-6"
    />

    <!-- Fortschrittsbalken, der den Fortschritt anhand des ausgewählten Steppers simuliert -->
    <!-- Hinweis: In dieser Demo wird nur der Wechsel zwischen Komponenten angezeigt, nicht deren interner Fortschritt -->
    <v-progress-linear
      :value="progressValue"
      height="6"
      color="primary"
      class="mb-6"
      rounded
    />

    <!-- Komponente wird dynamisch anhand des gewählten Strings (Namens) gerendert -->
    <component :is="selectedStepper" />
  </v-container>
</template>

<script>
// Importiere die drei Stepper-Komponenten aus dem Unterordner "stepper"
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
      selectedStepper: 'VuetifyStepperLinear',
      stepperOptions: [
        { title: 'Linear (klickbar)', value: 'VuetifyStepperLinear' },
        { title: 'Strict (nicht klickbar)', value: 'VuetifyStepperStrict' },
        { title: 'Vertikal', value: 'VuetifyStepperVertical' }
      ]
    }
  },
  computed: {
    // Gibt den Fortschrittswert für den Balken zurück (symbolisch)
    progressValue() {
      switch (this.selectedStepper) {
        case 'VuetifyStepperLinear':
          return 33;
        case 'VuetifyStepperStrict':
          return 66;
        case 'VuetifyStepperVertical':
          return 100;
        default:
          return 0;
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
