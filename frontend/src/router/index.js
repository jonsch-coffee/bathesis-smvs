import { createRouter, createWebHistory } from 'vue-router'

import GuideEditorView from "@/views/GuideEditorView.vue";
import HomeView from "@/views/HomeView.vue";


const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/editor', name: 'editor', component: GuideEditorView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router