

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
  prevStep.value = currentStep.value.id
  const next = guide.value.data.steps.find(s => s.id === nextStepId)
  if(next) currentStep.value = next
}

</script>

<template>
  <div class="jumbotron"> <!-- https://getbootstrap.com/docs/4.0/components/jumbotron/ -->
    <div class="display-4">
      {{ guide.data.title }}
      <div id="btn-group">
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
    </div>
  <p class="lead" style="margin-top: 10px;">{{ currentStep.questionTitle }}</p>
    <hr class="my-4">

      <p>{{ currentStep.description }}</p></div>

  <p class="lead"
           v-for="value in currentStep.options"
           :key="value.id"
           @click="goToStep(value.target)"
      >
        <button class="btn btn-dark">
          {{ value.label }}
        </button><br>
      </p>
</template>