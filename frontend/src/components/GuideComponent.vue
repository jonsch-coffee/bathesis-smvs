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
  <!--<iframe width="560" height="315" src="https://www.youtube.com/embed/uS8b-IR8_dg?si=8PH5gI5e0U96mVTY&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><div class="jumbotron"> -->
  <!-- https://getbootstrap.com/docs/4.0/components/jumbotron/ -->
    <div class="h3">
      {{ guide.data.title }}

    </div>
  <p class="lead" style="margin-top: 10px;">{{ currentStep.questionTitle }}</p>
    <hr class="my-4">

      <p>{{ currentStep.description }}</p>

       <p class="lead"
           v-for="value in currentStep.options"
           :key="value.id"
           @click="goToStep(value.target)"
        >
        <button class="btn btn-dark">
          {{ value.label }}
        </button><br>
      </p>
    <hr class="my-4"></hr>
  <div id="btn-group">
    <button
        class="btn btn-light"
        @click="router.push('/')"
    >OP-Search</button>
    <button
        class="btn btn-light"
        @click="goToStep(prevStep)"
        :disabled="!prevStep"
    >
      ← Last step
    </button>
  </div>
</template>