import Home from '../components/Home.vue'
import Oauth2Password from '../components/Oauth2Password.vue'
import Oauth2Code from '../components/Oauth2Code.vue'

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
  }
]
