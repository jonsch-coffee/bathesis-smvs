<script setup>
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
  <div class="mt-4" v-if="options.length"> <!-- when steps are defined only then they are displayed -->
    <button
        v-for="option in options"
        :key="option.id"
        class="btn btn-dark me-2 mb-2"
        @click="onSelect(option.target)"
    >
      {{ option.label }} <!-- shows defined options from  editor/components/StepEditorItem.vue-->
    </button>
  </div>
</template>