<template>
  <div>
    <v-switch
      v-model="selectedStepper"
      label="Wähle die Stepper-Variante"
      :disabled="disabled"
    />
    <!-- Beispielhaft: Anzeige des Stepper-Inhalts, falls der Switch aktiviert ist -->
    <VuetifyStepperVertical v-if="selectedStepper" />
  </div>
</template>

<script>
import VuetifyStepperVertical from './stepper/VuetifyStepperVertical.vue' // Prüfe: Der Ordner "stepper" muss in "src/components/" existieren

export default {
  name: "StepperSwitcher_Archiv",
  components: {
    VuetifyStepperVertical
  },
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedStepper: false
    }
  }
}
</script>

<style scoped>
/* Eigene Styles (optional) */
</style>
