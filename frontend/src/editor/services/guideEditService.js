import api from './apiBase'; // Editor specific instance with API-Token

export function updateGuide(guide) {
    return api.patch(`/guides/${guide.id}`, guide);
}

export function deleteGuide(id) {
    return api.delete(`/guides/${id}`);
}