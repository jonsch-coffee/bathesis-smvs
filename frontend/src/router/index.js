import { createRouter, createWebHistory } from 'vue-router'

import GuideEditorView from "@/views/GuideEditorView.vue";
import HomeView from "@/views/HomeView.vue";
import SimpleView from "@/views/SimpleView.vue";
import NotFound from "@/views/NotFound.vue";


const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/editor2', name: 'editor', component: GuideEditorView },
    { path: '/editor', redirect: { name: 'editor' } },
    { path: '/test', name: 'test', component: SimpleView },
    { path: '/:pathMatch(.*)', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router