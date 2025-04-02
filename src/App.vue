<template>
  <v-app>
    <v-main>
      <!-- Verwende hier die importierte Komponente -->
      <VuetifyStepperVertical />
    </v-main>
  </v-app>
</template>

<script>
import VuetifyStepperVertical from './components/VuetifyStepperVertical.vue'

export default {
  name: "App",
  components: {
    VuetifyStepperVertical
  }
}
</script>

<style>
/* Globale Styles (optional) */
</style>
