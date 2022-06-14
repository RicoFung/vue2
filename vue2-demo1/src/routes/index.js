import Home from '../components/Home.vue'
import Oauth2Password from '../components/Oauth2Password.vue'
import Oauth2Code from '../components/Oauth2Code.vue'
import Oauth2CodePkce from '../components/Oauth2CodePkce.vue'
import SpringOauth2Code from '../components/SpringOauth2Code.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Oauth2Password',
    name: 'Oauth2Password',
    component: Oauth2Password
  },
  {
    path: '/Oauth2Code',
    name: 'Oauth2Code',
    component: Oauth2Code
  },
  {
    path: '/Oauth2CodePkce',
    name: 'Oauth2CodePkce',
    component: Oauth2CodePkce
  },
  {
    path: '/SpringOauth2Code',
    name: 'SpringOauth2Code',
    component: SpringOauth2Code
  }
]
