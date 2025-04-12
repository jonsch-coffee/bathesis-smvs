<script setup>
/* eslint-disable */
const props = defineProps(['option', 'availableSteps'])
</script>

<template>
  <div class="option">
    <input v-model="option.label" placeholder="Label z.B. Ja" />

    <select v-model="option.target">
      <option disabled value="">Ziel wählen</option>
      <option v-for="s in availableSteps" :value="s.id">{{ s.questionTitle }}</option>
    </select>

    <a v-if="option.target" :href="'#' + option.target">
      <button>➡ Zum Ziel</button>
    </a>
  </div>
</template>
