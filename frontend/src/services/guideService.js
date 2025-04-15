import axios from 'axios'

//const API_BASE = 'http://localhost:8000' // Adjust to your backend URL
//const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJzbXZzX29wLXNlYXJjaCJ9.v1mKTy04jQIBzRuWGIY9UH0ULcft_L6NhF9ZWRPJ4do';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VUE_APP_JWT_TOKEN}`
    }
})

export default {
    getGuideElement(id) { // Get a specific guide-element by id
        return apiClient.get(`/guides/${id}`)
    },
    getGuideFromOPCode(opcode) { // Get a specific guide-element by it's associated operation-code
        return apiClient.get(`/opcodes?code=${opcode}`)
    },
    getGuideSuggestions(currentValue) { // Get type-ahead hints
        return apiClient.get(`/opcodes?code_like=${currentValue}`)
    },
    getAllGuides() { // Get all guides
        return apiClient.get('/guides')
    },
    updateGuide(guide) {
        return apiClient.patch(`/guides/${guide.id}`, guide);
    },
    deleteGuide(id) {
        return apiClient.delete(`/guides/${id}`)
    }
}