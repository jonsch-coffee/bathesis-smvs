<script setup>
// eslint-disable-next-line
  import { onMounted, ref } from 'vue'

  // Components
  import GuideStep from '../components/GuideStep.vue'
  import GuideOptions from '../components/GuideOptions.vue'
  import GuideNavigation from '../components/GuideNavigation.vue'

  // API
  import { useSearchApiClient } from '../composables/useSearchApiClient'
  import { useGuideSteps } from '../composables/useGuideSteps'
  import { getGuideElement } from '@/shared/services/guideService'

// eslint-disable-next-line no-undef,no-unused-vars
  const props = defineProps({
    guideId: String
  })

// eslint-disable-next-line no-undef
  const emit = defineEmits(['back'])

  function goBack() {
    emit('back') // signalisiert dem Elternteil: zurück zur Suche
  }

  const api = useSearchApiClient()

  const guide = ref({ title: '', opCodes: [], steps: [] })
  const { currentStep, prevStep, goToStep } = useGuideSteps(guide)

  const loading = ref(true)
  const error = ref(false)

  onMounted(async () => {

      try {
        const { data } = await getGuideElement(api, props.guideId)
        guide.value = data
        currentStep.value = data.steps[0] || null
      } catch (e) {
        console.error(e)
        error.value = true
      } finally {
        loading.value = false
      }


  })

</script>

<template>
  <div v-if="loading" class="text-muted">Loading guide...</div>
  <div v-else-if="error" class="alert alert-danger">Failed to load guide.</div>
  <div v-else-if="currentStep">
    <h3>{{ guide.title }}</h3>

    <GuideStep
        :questionTitle="currentStep.questionTitle"
        :description="currentStep.description"
    />

    <GuideOptions
        :options="currentStep.options || []"
        @select="goToStep"
    />

    <GuideNavigation
        :hasPrev="!!prevStep"
        :onBackToSearch="() => goBack()"
        :onGoBack="() => goToStep(prevStep)"
    />
  </div>
</template>