import Home from '../components/Home.vue'
import Oauth2Password from '../components/KeycloakOauth2Password.vue'
import Oauth2Code from '../components/KeycloakOauth2Code.vue'
import Oauth2CodePkce from '../components/KeycloakOauth2CodePkce.vue'
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
    path: '/keycloak-oauth2-password',
    name: 'KeycloakOauth2Password',
    component: Oauth2Password
  },
  {
    path: '/keycloak-oauth2-code',
    name: 'KeycloakOauth2Code',
    component: Oauth2Code
  },
  {
    path: '/keycloak-oauth2-code-pkce',
    name: 'KeycloakOauth2CodePkce',
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
