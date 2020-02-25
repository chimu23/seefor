import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'
import Play from '../components/Play.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:activeName/:name',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/play/:activeName/:name/:steps',
    name: 'Play',
    component: Play
  }

]

const router = new VueRouter({
  routes
})

export default router
