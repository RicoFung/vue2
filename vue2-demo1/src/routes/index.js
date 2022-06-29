import Home from '../components/Home.vue'
// keycloak sample
import Oauth2Password from '../components/KeycloakOauth2Password.vue'
import Oauth2Code from '../components/KeycloakOauth2Code.vue'
import Oauth2CodePkce from '../components/KeycloakOauth2CodePkce.vue'
// spring-authorization-server sample
import SpringOauth2Code from '../components/SpringOauth2Code.vue'
import SpringOauth2CodePkce from '../components/SpringOauth2CodePkce.vue'
// spring-authorization-server sample redirect page
import Oauth2Callback from '../oauth2/Callback.vue'
import Oauth2CallbackPkce from '../oauth2/CallbackPkce.vue'

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
    path: '/spring-oauth2-code',
    name: 'SpringOauth2Code',
    component: SpringOauth2Code
  },
  {
    path: '/oauth2/callback',
    name: 'Oauth2Callback',
    component: Oauth2Callback
  },
  {
    path: '/spring-oauth2-code-pkce',
    name: 'SpringOauth2CodePkce',
    component: SpringOauth2CodePkce
  },
  {
    path: '/oauth2/callback-pkce',
    name: 'Oauth2CallbackPkce',
    component: Oauth2CallbackPkce
  }
]
