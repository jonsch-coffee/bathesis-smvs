<template>
  <v-container class="pa-4">
    <h2 class="text-h5 mb-4">Vertikaler Stepper (mit Ja/Nein-Karte)</h2>
    
    <!-- Fortschrittsbalken (optional) -->
    <v-progress-linear
      :value="stepProgress"
      height="6"
      color="primary"
      class="mb-6"
      rounded
    />

    <!-- Ja/Nein-Karte -->
    <v-card class="mb-6 pa-4" outlined>
      <v-card-title>Bitte wählen Sie:</v-card-title>
      <v-card-text>
        Möchten Sie fortfahren?
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="handleYes">Ja</v-btn>
        <v-btn color="red" @click="handleNo">Nein</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Der eigentliche Stepper-Inhalt wird erst angezeigt, wenn "Ja" gewählt wurde -->
    <div v-if="showStepperContent">
      <p>Hier steht dein vertikaler Stepper-Inhalt.</p>
      <!-- Füge hier deine weiteren Stepper-Elemente ein -->
    </div>
  </v-container>
</template>

<script>
export default {
  name: "VuetifyStepperVertical",
  data() {
    return {
      stepProgress: 100,         // Wert für den Fortschrittsbalken
      showStepperContent: false  // Steuert, ob der Stepper-Inhalt angezeigt wird
    }
  },
  methods: {
    handleYes() {
      console.log("Ja wurde gewählt");
      this.showStepperContent = true;
    },
    handleNo() {
      console.log("Nein wurde gewählt");
      this.showStepperContent = false;
    }
  }
}
</script>

<style scoped>
/* Optionale Styles */
</style>
