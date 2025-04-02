<template>
  <v-container class="pa-4">
    <h2 class="text-h5 mb-4">Stepper-Testumgebung (Vertikal)</h2>
    <v-progress-linear
      :value="100"
      height="6"
      color="primary"
      class="mb-6"
      rounded
    />
    <!-- Hier direkt dein vertikaler Stepper-Code, statt erneut VuetifyStepperVertical aufzurufen -->
    <p>Vertikaler Stepper-Inhalt</p>
  </v-container>
</template>

<script>
export default {
  name: 'VuetifyStepperVertical'
}
</script>
