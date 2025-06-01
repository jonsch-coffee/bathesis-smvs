
/**
 * Sends patch, post and delete requests to the backend
 * @param {AxiosInstance} api - Axios instance which contains the api-key
 * @param {Object} guide - guide-object which needs to be stored
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