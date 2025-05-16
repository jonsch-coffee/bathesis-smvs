import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useGuideStore = defineStore('guide', {
    state: () => ({
        allGuides: [],
        selectedGuideId: 0,
        guide: {
            id: '',
            title: '',
            steps: [],
            opCodes: []
        }
    }),

    getters: {
        guideSteps(state) {
            return state.guide.steps
        },
        selectedGuide(state) {
            return state.allGuides.find(g => g.id === state.selectedGuideId)
        }
    },

    actions: {
        setAllGuides(guides) {
            console.log('SET allGuides:', guides, typeof guides)
            console.log('this.allGuides:', this.allGuides)
            this.allGuides = guides
        },

        selectGuideById(id) {
            const selected = this.allGuides.find(g => g.id === Number(id))
            if (!selected) return
            this.guide = JSON.parse(JSON.stringify(selected))
            this.selectedGuideId = id
        },

        updateGuideLocally(guideData) {
            const index = this.allGuides.findIndex(g => g.id === guideData.id)
            if (index !== -1) {
                Object.assign(this.allGuides[index], guideData)
            }
        },

        createNewGuide() {
            const newGuide = {
                id: uuidv4(),
                title: '',
                steps: [],
                opCodes: []
            }
            this.allGuides.push(newGuide)
            this.guide = newGuide
            this.selectedGuideId = newGuide.id
        },

        deleteGuide() {
            if (!this.selectedGuideId) return
            const confirmed = confirm('Diesen Guide wirklich löschen?')
            if (!confirmed) return
            this.allGuides = this.allGuides.filter(g => g.id !== this.selectedGuideId)
            this.guide = { id: '', title: '', steps: [], opCodes: [] }
            this.selectedGuideId = null
        }
    }
})