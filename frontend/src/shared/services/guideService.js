/**
 * All shared get-request
 * Api-instance is injected from search / editor (eg. editorApiBase.js)
 */

export function getGuideElement(api, id) {
    return api.get(`/guides/${id}`);
}

export function getGuideSuggestions(api, currentValue) {
    return api.get(`/opcodes/like/${currentValue}`);
}

export function getAllGuides(api) {
    return api.get('/guides/all');
}