<script setup>
import { reactive, watch } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  step: { type: Object, required: true },
  index: Number
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['update'])

// Lokale Kopie zur Bearbeitung
const localStep = reactive({
  id: props.step.id,
  questionTitle: props.step.questionTitle,
  description: props.step.description,
  options: props.step.options || []
})

// Änderungen beobachten und hochreichen
watch(
    () => localStep,
    () => emit('update', { ...localStep }),
    { deep: true }
)
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Schritt {{ index + 1 }}</h5>
      <input
          class="form-control mb-2"
          v-model="localStep.questionTitle"
          placeholder="Titel"
      />
      <textarea
          class="form-control"
          v-model="localStep.description"
          placeholder="Beschreibung"
          rows="3"
      ></textarea>
    </div>
  </div>
</template>