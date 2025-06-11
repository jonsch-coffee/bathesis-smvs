<script setup>
// eslint-disable-next-line
// Beispiel mit Vue 3 + Router
import { onMounted } from 'vue';

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    console.log('Eingegebener Code:', code);
    // Jetzt kannst du damit machen, was du willst
  }
});
</script>

<template>
  <RouterView class="background"/> <!-- wichtig, ansonsten werden die Codes nicht angezeigt aus der Getter-Leiste! -->
</template>

