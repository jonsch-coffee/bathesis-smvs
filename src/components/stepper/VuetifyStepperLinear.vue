<template>
    <!-- Linearer Stepper: Der Benutzer kann auch Schritte überspringen -->
    <v-stepper v-model="step" class="elevation-1">
      
      <!-- Kopfzeile mit nummerierten Schritten -->
      <v-stepper-header>
        <!-- Schritt 1: Wird als abgeschlossen markiert, wenn step > 1 -->
        <v-stepper-step :complete="step > 1" step="1">Start</v-stepper-step>
        <v-divider></v-divider>
      <!-- Schritt 2: z,B.eine Frage -->
        <v-stepper-step :complete="step > 2" step="2">Frage</v-stepper-step>
        <v-divider></v-divider>
  
        <!-- Schritt 3: Abschlussanzeige -->
        <v-stepper-step step="3">Abschluss</v-stepper-step>
      </v-stepper-header>
  
      <!-- Inhalte der einzelnen Schritte -->
      <v-stepper-items>
  
        <v-stepper-content step="1">
          <p>Dies ist der erste Schritt.</p>
          <!-- Weiter-Button zum nächsten Schritt -->
          <v-btn @click="step++" color="primary">Weiter</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <p>Dies ist die Frage.</p>
          <v-btn @click="step++" color="primary">Weiter</v-btn>
          <v-btn @click="step--" text>Zurück</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <p>Geschafft!</p>
          <v-btn @click="step = 1" color="success">Neu starten</v-btn>
        </v-stepper-content>
  
      </v-stepper-items>
    </v-stepper>
  </template>
  
  <script>
  export default {
    name: 'VuetifyStepperLinear',
    data() {
      return {
        step: 1 // aktueller Schritt im Stepper
      }
    }
  }
  </script>
  