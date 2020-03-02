import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
const hls = require('videojs-contrib-hls')
Vue.use(hls)

Vue.use(ElementUI)

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use((response) => {
  return response
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  err.message = '状态错误'
  err.status = 422
  return Promise.reject(err)
})

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://127.0.0.1:8081/'

Vue.config.productionTip = false

Vue.filter('dateFormat', function (origin) {
  const dt = new Date(Number(origin))
  const y = dt.getFullYear()
  const m = (dt.getMonth() + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
