import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 去除url中的‘#’号
  routes: Routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
