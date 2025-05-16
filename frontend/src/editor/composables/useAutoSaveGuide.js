import { watch } from 'vue'
import debounce from 'lodash/debounce'

/**
 * Überwacht ein Guide-Objekt und speichert es automatisch über den bereitgestellten Service.
 *
 * @param {Object} guide - Das reaktive Guide-Objekt
 * @param {Function} saveFn - Funktion, die den Guide speichert (z.B. `api.patch(...)`)
 */
export function useAutoSaveGuide(guide, saveFn) {
    const debouncedSave = debounce(() => {
        if (!guide.id || !guide.title) return // einfache Validierung
        saveFn(guide)
            .then(() => console.log('✅ Guide gespeichert'))
            .catch(err => console.warn('❌ Speichern fehlgeschlagen', err))
    }, 1500)

    watch(guide, debouncedSave, { deep: true })
}