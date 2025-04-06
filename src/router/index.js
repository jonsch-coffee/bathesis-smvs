import { createRouter, createWebHistory } from 'vue-router'

import GuideView from '@/views/GuideView.vue'
import App from '@/App.vue'

const routes = [
    { path: '/', component: App },
    { path: '/guide/:id', component: GuideView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router