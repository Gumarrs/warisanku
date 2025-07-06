import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edukasi from '../views/Edukasi.vue'
import Hasil from '../views/Hasil.vue'

const routes = [
  {
    path: '/',
    name: 'home', // <- kasih nama agar bisa diakses dengan router.push({ name: 'home' })
    component: Home
  },
  {
    path: '/edukasi',
    name: 'edukasi',
    component: Edukasi
  },
  {
    path: '/hasil',
    name: 'hasil',
    component: Hasil
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
