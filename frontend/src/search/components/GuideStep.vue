<script setup>
// eslint-disable-next-line
defineProps({
  questionTitle: String,
  description: String,
})
</script>

<template>
  <div>
    <p class="lead mt-3">{{ questionTitle }}</p>
    <hr class="my-4">
    <p>{{ description }}</p>
  </div>
</template>