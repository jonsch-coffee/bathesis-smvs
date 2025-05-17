import { watch } from 'vue'
import debounce from 'lodash/debounce'

/**
 * Überwacht ein Guide-Objekt und speichert es automatisch über den bereitgestellten Service.
 *
 * @param {Object} guide - Das reaktive Guide-Objekt
 * @param {Function} saveFn - Funktion, die den Guide speichert (z.B. `api.patch(...)`)
 * @param updateLocal
 */
export function useAutoSaveGuide(guide, { saveFn, updateLocal }) {
    console.log('🧪 useAutoSaveGuide initialisiert', guide)
    const debouncedSave = debounce(() => {
        if (!guide.value?.id || !guide.value?.title) return// Prüft, ob Titel und ID vorhanden sind, bevor die Änderungen ans Backend geschickt werden
        console.log('📤 PATCH-Daten:', JSON.stringify(guide.value, null, 2))
        saveFn(guide.value) // Nutzt den mitgelieferten API-Call
            .then(() => {
                updateLocal(guide.value) // über alle komponenten hinweg synchronisieren
                console.log('✅ Guide gespeichert')
            })
            .catch(err => console.warn('❌ Speichern fehlgeschlagen', err))
    }, 1500)

    //watch(guide, debouncedSave, { deep: true })

    watch(
        () => JSON.stringify(guide.value),
        () => {
            console.log('🔁 Änderung erkannt via JSON.stringify')
            debouncedSave()
        }
    )
}