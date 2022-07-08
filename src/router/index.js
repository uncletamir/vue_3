//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'buku.index',
        component: () => import( /* webpackChunkName: "buku.index" */ '@/views/buku/indexBook.vue')
    },
    {
        path: '/create',
        name: 'buku.create',
        component: () => import( /* webpackChunkName: "buku.create" */ '@/views/buku/createBook.vue')
    },
    {
        path: '/edit/:id',
        name: 'buku.edit',
        component: () => import( /* webpackChunkName: "buku.edit" */ '@/views/buku/editBook.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router