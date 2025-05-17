
/**
 * Sendet einen PATCH-Request zur Aktualisierung eines Guides.
 * @param {AxiosInstance} api - vorab erstellter Axios-Client (mit API-Key)
 * @param {Object} guide - das zu speichernde Guide-Objekt
 * @returns {Promise} - Axios-Promise
 */
export function updateGuide(api, guide) {
    if (!guide?.id) {
        return Promise.reject(new Error('Guide muss eine gültige ID haben.'))
    }

    return api.patch(`/guides/${guide.id}`, guide)
}

export function createGuide(api, newTitle) {
    return api.post(`/guides/create`, { title: newTitle })
}

export function deleteGuide(api, id) {
    return api.delete(`/guides/${id}`)
}