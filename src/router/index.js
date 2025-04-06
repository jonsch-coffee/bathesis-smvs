import { createRouter, createWebHistory } from 'vue-router'

import GuideView from '@/views/GuideView.vue'
import HomeView from "@/views/HomeView.vue";


const routes = [
    { path: '/', component: HomeView },
    { path: '/guide/:id', component: GuideView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router