import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'
import Play from '../components/Play.vue'
import Admin from '../components/admin/Admin.vue'
import Users from '../components/admin/Users.vue'
import Comments from '../components/admin/Comments.vue'
import Movies from '../components/admin/Movies.vue'
import adminHome from '../components/admin/Home.vue'

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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/home',
    children: [
      {
        path: '/admin/home',
        name: 'adminHome',
        component: adminHome
      },
      {
        path: '/admin/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/admin/comments',
        name: 'Comments',
        component: Comments
      },
      {
        path: '/admin/movies',
        name: 'Movies',
        component: Movies
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path === '/admin') {
  //   console.log('admin路径')
  //   return next()
  // } else {
  //   console.log('正常路径')
  //   return next()
  // }
  // console.log(to.path)
  if (to.path.startsWith('/admin')) {
    const name = window.sessionStorage.getItem('name')
    if (name === 'admin') {
      return next()
    } else {
      return next('/')
    }
  }
  return next()
})

export default router
