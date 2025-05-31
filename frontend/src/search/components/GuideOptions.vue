<script setup>
// eslint-disable-next-line no-undef
defineProps({
  options: {
    type: Array,
    required: true
  },
  onSelect: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="mt-4" v-if="options.length">
    <button
        v-for="option in options"
        :key="option.id"
        class="btn btn-dark me-2 mb-2"
        @click="onSelect(option.target)"
    >
      {{ option.label }}
    </button>
  </div>
</template>