import { createRouter, createWebHashHistory } from 'vue-router'
import SearchHome from '../views/SearchHome.vue'
import GuideDetails from '../views/GuideDetails.vue'

const routes = [
    { path: '/', name: 'SearchHome', component: SearchHome },
    { path: '/guide/:id', name: 'GuideDetails', component: GuideDetails },
]

const router = createRouter({
    history: createWebHashHistory(), // instead of createWebHistory because it's deployed directly in squarespace.
    routes
})

export default router