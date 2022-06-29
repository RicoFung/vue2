import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import AuthorizationCode from './oauth2/authorization-code'
import AuthorizationCodePkce from './oauth2/authorization-code-pkce'

Vue.prototype.AuthorizationCode = AuthorizationCode
Vue.prototype.AuthorizationCodePkce = AuthorizationCodePkce

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
