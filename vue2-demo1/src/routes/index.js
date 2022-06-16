import Home from '../components/Home.vue'
import Oauth2Password from '../components/Oauth2Password.vue'
import Oauth2Code from '../components/Oauth2Code.vue'
import Oauth2CodePkce from '../components/Oauth2CodePkce.vue'
import SpringOauth2CodeV1 from '../components/SpringOauth2CodeV1.vue'
import SpringOauth2CodeV2 from '../components/SpringOauth2CodeV2.vue'
// oauth2 回调页
import Oauth2Callback from '../oauth2/Callback.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oauth2-password',
    name: 'Oauth2Password',
    component: Oauth2Password
  },
  {
    path: '/oauth2-code',
    name: 'Oauth2Code',
    component: Oauth2Code
  },
  {
    path: '/oauth2-code-pkce',
    name: 'Oauth2CodePkce',
    component: Oauth2CodePkce
  },
  {
    path: '/spring-oauth2-code-v1',
    name: 'SpringOauth2CodeV1',
    component: SpringOauth2CodeV1
  },
  {
    path: '/spring-oauth2-code-v2',
    name: 'SpringOauth2CodeV2',
    component: SpringOauth2CodeV2
  },
  {
    path: '/oauth2/callback',
    name: 'Oauth2Callback',
    component: Oauth2Callback
  }
]
