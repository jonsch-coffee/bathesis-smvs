<script setup>
/* eslint-disable */
import { toRefs } from 'vue'
import OptionEditorComponent from './OptionEditorComponent.vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps(['step', 'steps'])

function addOption() {
  props.step.options.push({
    id: uuidv4(),
    label: '',
    target: ''
  })
}
</script>

<template>
  <div class="step">
    <input v-model="step.questionTitle" placeholder="Titel des Schritts" />
    <textarea v-model="step.description" placeholder="Frage..." />

    <OptionEditorComponent
        v-for="o in step.options"
        :key="o.id"
        :option="o"
        :available-steps="steps"
    />

    <button @click="addOption">+ Option</button>
  </div>
</template>
