/**
 * ALlows the user to navigate the guide back- and forward
 */
import { ref } from 'vue'

export function useGuideSteps(guide) {
    const currentStep = ref({ questionTitle: '', description: '', options: [] })
    const prevStep = ref(null)

    function goToStep(nextStepId) {
        prevStep.value = currentStep.value?.id || null
        const next = guide.value.steps.find(s => s.id === nextStepId)
        if (next) currentStep.value = next
    }

    return {
        currentStep,
        prevStep,
        goToStep
    }
}