import { watch, ref } from 'vue'
import { useGuideStore } from "../stores/guideStore";
import debounce from 'lodash/debounce'
import {storeToRefs} from "pinia";

/**
 * Tracks changenes in a guide-object in a defined amount of intervals
 *
 * @param {Object} guide - Reactive Guide-Object
 * @param {Function} updateGuideApi - API-Call with instance that saves sends the patch to the Backend
 * @param {Function} updateGuideLocal - Updates the local Pinia-Store if changes are remotely accepted
 */
export function useAutoSaveGuide(guide, { updateGuideApi, updateGuideLocal }) {
    const guideStore = useGuideStore()
    const { lastSavedAt, saveFailed } = storeToRefs(guideStore)

    const debouncedSave = debounce(() => {
        if (!guide.value?.id || !guide.value?.title) return // Checks if title and ID are available before changes are send to backend
        updateGuideApi(guide.value) // Uses the provided
            .then(() => {
                updateGuideLocal(guide.value) // Sync over all components
                lastSavedAt.value = new Date()
                saveFailed.value = false
            })
            .catch(err => {
                console.warn('Speichern fehlgeschlagen!', err)
                saveFailed.value = true
            })
    }, 1500) // Auto-Save intervals

    watch(
        () => JSON.stringify(guide.value),
        () => {
            debouncedSave()
        }
    )
}