<template>
    <!-- Nicht-lineares Stepper-Layout: Benutzer muss Reihenfolge einhalten -->
    <v-stepper v-model="step" class="elevation-1" non-linear>
      
      <!-- Kopfbereich mit Stepper-Schritten -->
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Beginn</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Entscheidung</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Fertig</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <v-stepper-content step="1">
          <p>Willkommen.</p>
          <v-btn @click="step++" color="primary">Weiter</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <p>Triff eine Entscheidung.</p>
          <v-btn @click="step++" color="primary">Weiter</v-btn>
          <v-btn @click="step--" text>Zurück</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <p>Ende des Prozesses.</p>
          <v-btn @click="step = 1" color="success">Neustart</v-btn>
        </v-stepper-content>
      </v-stepper-items>
  
    </v-stepper>
  </template>
  
  <script>
  export default {
    name: 'VuetifyStepperStrict',
    data() {
      return {
        step: 1 // aktueller Schritt
      }
    }
  }
  </script>