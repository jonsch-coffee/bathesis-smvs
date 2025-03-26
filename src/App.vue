<!-- App.vue – ersetzt das alte UI durch den StepperSwitcher -->
<template>
  <!-- Hier wird nur noch die Stepper-Auswahl angezeigt  -->
  <StepperSwitcher />
</template>

<script>
// Importiere die StepperSwitcher-Komponente
import StepperSwitcher from './components/StepperSwitcher.vue'

export default {
  name: 'App',
  components: {
    StepperSwitcher
  }
}
</script>

<style>
/* Hier kannst du globale Styles einfügen (optional) */
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
