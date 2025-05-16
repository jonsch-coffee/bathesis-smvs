// src/editor/composables/useGuideStore.js
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const allGuides = ref([])
const selectedGuideId = ref('')
const guide = reactive({
    id: '',
    title: '',
    steps: [],
    opCodes: []
})

export function useGuideStore() {
    function selectGuideById(id) {
        console.log('📌 Guide ausgewählt:', id)
        const selected = allGuides.value.find(g => g.id === id)
        if (selected) {
            Object.assign(guide, JSON.parse(JSON.stringify(selected)))
            console.log('🧩 guide.value nach Auswahl:', guide)
        }
    }

    function createNewGuide() {
        const newGuide = {
            id: uuidv4(),
            title: '',
            steps: [],
            opCodes: []
        }
        allGuides.value.push(newGuide)
        selectedGuideId.value = newGuide.id
        Object.assign(guide, newGuide)
    }

    function deleteGuide() {
        if (!selectedGuideId.value) return
        const confirmed = confirm('Diesen Guide wirklich löschen?')
        if (!confirmed) return
        const idx = allGuides.value.findIndex(g => g.id === selectedGuideId.value)
        if (idx !== -1) {
            allGuides.value.splice(idx, 1)
            selectedGuideId.value = ''
            Object.assign(guide, {
                id: '',
                title: '',
                steps: [],
                opCodes: []
            })
        }
    }

    return {
        allGuides,
        selectedGuideId,
        guide,
        selectGuideById,
        createNewGuide,
        deleteGuide
    }
}