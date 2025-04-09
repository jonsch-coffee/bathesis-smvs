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
    getGuideElement(id) {
        return apiClient.get(`/guides/${id}`)
    },
    getGuideFromOPCode(opcode) {
        return apiClient.get(`/opcodes?code=${opcode}`)
    },
    getGuideSuggestions(currentValue) {
        return apiClient.get(`/opcodes/?code_like=${currentValue}`)
    }
}