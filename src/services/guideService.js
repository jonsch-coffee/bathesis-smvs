import axios from 'axios'

const API_BASE = 'https://my-json-server.typicode.com/jonsch-coffee/bathesis-smvs'

const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
        return apiClient.get(`/opcodes/?code_like=${currentValue}`)
    },
    getAllGuides() { // Get all guides
        return apiClient.get('/guides')
    },
    getAllOpCodes() { // Get all guides
        return apiClient.get('/opcodes')
    }
}