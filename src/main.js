// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'

// Vue.use(Router)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  axios,
  router,
  components: { App },
  template: '<App/>'
})

// axios 请求拦截器处理请求数据
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

// axios 响应拦截器处理响应数据
// axios.interceptors.response.use(res => {
//   return res.data;
// }, err => {
//   console.log(err.response);
//   // return Promise.reject(err);
// })