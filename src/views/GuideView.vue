

<script setup>
/* eslint-disable */
import { useRoute, useRouter } from 'vue-router'
import GuideService from '@/services/guideService'
import { ref } from "vue";

const route = useRoute()
const router = useRouter()
const guideId = route.params.id

const prevStep = ref()

const currentStep = ref({
  questionTitle: ''
})

const guide = ref({
  loading: true,
  error: false,
  data: {
    title: 'Loading...',
    opCodes: [],
    steps: []
  }
})

GuideService.getGuideElement(guideId)
    .then((response) => {
      guide.value.loading = false
      guide.value.data = response.data // Store response
      currentStep.value = response.data.steps[0] // Assign first step
    })
    .catch((error) => {
      console.log(error)
      guide.value.loading = false
      guide.value.error = true
    })

function goToStep(nextStepId) {
  prevStep.value = currentStep.value.step // TODO one step back in history
  const next = guide.value.data.steps.find(s => s.step === nextStepId)
  if(next) currentStep.value = next
}

</script>

<template>
  <h1>{{ guide.data.title }}</h1>
  <h2>{{ currentStep.questionTitle }}</h2>
  <p>{{ currentStep.description }}</p>
  <p>{{ currentStep.question }}</p>
  <button
      class="btn btn-secondary"
      @click="router.push('/')"
  >🏠 Home</button>
  <button
      class="btn btn-secondary"
      @click="goToStep(prevStep)"
      :disabled="!prevStep"
      >← Back</button>


    <div class="btn-group"
        v-for="(value, key) in currentStep.options"
        :key="key"
        @click="goToStep(key)"
    ><button class="btn btn-primary">{{ value }}</button></div>

</template>
