<script setup>
/* eslint-disable */
const props = defineProps(['option', 'availableSteps'])
</script>

<template>
  <div class="option">
    <input class="form-control" v-model="option.label" placeholder="Label z.B. Ja" />

    <select class="form-select" v-model="option.target">
      <option disabled value="">Ziel wählen</option>
      <option v-for="s in availableSteps" :value="s.id">{{ s.questionTitle }}</option>
    </select>

    <a v-if="option.target" :href="'#' + option.target">
      <button class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
      </svg> Gehen zu</button>
    </a><hr>
  </div>
</template>
