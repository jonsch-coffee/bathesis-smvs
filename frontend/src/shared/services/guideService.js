/**
 * All shared get-request
 * Needs api-instance from search / editor (eg. apiBase.js)
 */

export function getGuideElement(api, id) {
    return api.get(`/guides/${id}`);
}

export function getGuideFromOPCode(api, opcode) {
    return api.get(`/opcodes?code=${opcode}`);
}

export function getGuideSuggestions(api, currentValue) {
    return api.get(`/opcodes/like/${currentValue}`);
}

export function getAllGuides(api) {
    return api.get('/guides');
}