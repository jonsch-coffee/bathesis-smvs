import { createRouter, createWebHistory } from 'vue-router'

import GuideView from '@/views/GuideView.vue'
import HomeView from "@/views/HomeView.vue";
import OPCodeRedirect from "@/views/OPCodeRedirect.vue";


const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/guide/:id', component: GuideView },
    { path: '/opcode/:opcode', component: OPCodeRedirect },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router