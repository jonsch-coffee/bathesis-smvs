

<script setup>
/* eslint-disable */
import { useRoute, useRouter } from 'vue-router'
import GuideService from '@/services/guideService'
import { ref } from "vue";
//TODO put in Guide component
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
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <h1>{{ guide.data.title }}</h1>
      <button
        class="btn btn-light"
        @click="router.push('/')"
    >🏠 Home</button>
      <button
          class="btn btn-light"
          @click="goToStep(prevStep)"
          :disabled="!prevStep"
      >
        ← Back
      </button>
    </div>
    <div class="col"></div>
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-6"><br>
      <div class="alert alert-secondary" role="alert">
        <h2>{{ currentStep.questionTitle }}</h2>
      </div>
    </div>
    <div class="col"></div>
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-6"><br>
      <p>{{ currentStep.description }}</p></div>
    <div class="col"></div>
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <p>{{ currentStep.question }}</p><br>
      <div
           v-for="(value, key) in currentStep.options"
           :key="key"
           @click="goToStep(key)"
      >
        <button class="btn btn-dark">
          {{ value }}
        </button><br>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>