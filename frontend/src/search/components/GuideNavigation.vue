<script setup>
// eslint-disable-next-line
defineProps({
  hasPrev: {
    type: Boolean,
    required: true
  },
  onBackToSearch: {
    type: Function,
    required: true
  },
  onGoBack: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="mt-4">
    <button class="btn btn-light me-2" @click="onBackToSearch">
      Restart
    </button>
    <button class="btn btn-light" :disabled="!hasPrev" @click="onGoBack">
      Last step
    </button>
  </div>
</template>