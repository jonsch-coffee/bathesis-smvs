<script setup>
// eslint-disable-next-line

import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleKeyboardShortcut(e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'e') {
    e.preventDefault()
    router.push('/editor')
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'x') {
    e.preventDefault()
    router.push('/')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <RouterView class="background"/> <!-- wichtig, ansonsten werden die Codes nicht angezeigt aus der Getter-Leiste! -->
</template>

<style>
.background {
  background-color: #fff8dc; /* warm cream (close to Cornsilk) */
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}
</style>
