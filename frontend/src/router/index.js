import { createRouter, createWebHistory } from 'vue-router'

import GuideEditorView from "@/views/GuideEditorView.vue";
import HomeView from "@/views/HomeView.vue";
import SimpleView from "@/views/SimpleView.vue";


const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/editor', name: 'editor', component: GuideEditorView },
    { path: '/test', name: 'test', component: SimpleView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router