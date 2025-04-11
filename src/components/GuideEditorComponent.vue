<script setup>
import { ref, reactive } from 'vue'

const guide = reactive({
  id: 1,
  title: 'Neuer Guide',
  opCodes: ['51220300', '51220800'],
  steps: []
})

const opCodesText = ref(guide.opCodes.join(', '))


function updateOpCodes() {
  guide.opCodes = opCodesText.value
      .split(',')
      .map(code => code.trim())
      .filter(code => code)
}

</script>

<template>
  <div class="guide-editor">
    <h2>📝 Guide bearbeiten</h2>

    <label>Titel:</label>
    <input v-model="guide.title" placeholder="Guide-Titel..." />

    <label>OP-Codes (temporär):</label>
    <input v-model="opCodesText" placeholder="z.B. 51220300, 51220800" @blur="updateOpCodes" />

    <div class="steps">
      <h3>Schritte</h3>
      <p>Derzeit {{ guide.steps.length }} Schritte</p>
      <p>{{ guide.opCodes }}</p>
    </div>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}
</style>
