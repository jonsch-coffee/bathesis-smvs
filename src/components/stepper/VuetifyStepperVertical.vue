<template>
    <!-- Vertikale Darstellung des Steppers -->
    <v-stepper v-model="step" vertical>
      
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Start</v-stepper-step>
        <v-stepper-step :complete="step > 2" step="2">Details</v-stepper-step>
        <v-stepper-step step="3">Ergebnis</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <p>Schritt 1 Beschreibung.</p>
          <v-btn @click="step++" color="primary">Weiter</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <p>Schritt 2 Inhalt.</p>
          <v-btn @click="step++" color="primary">Weiter</v-btn>
          <v-btn @click="step--" text>Zurück</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <p>Du bist fertig.</p>
          <v-btn @click="step = 1" color="success">Neu starten</v-btn>
        </v-stepper-content>
      </v-stepper-items>
  
    </v-stepper>
  </template>
  
  <script>
  export default {
    name: 'VuetifyStepperVertical',
    data() {
      return {
        step: 1 // aktueller aktiver Schritt im Prozess
      }
    }
  }
  </script>
  