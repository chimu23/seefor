import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'

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
  }

]

const router = new VueRouter({
  routes
})

export default router
