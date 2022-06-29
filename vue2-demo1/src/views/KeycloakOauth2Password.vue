<template>
  <div class="hello">
    <h1>KEYCLOAK_OAUTH2_PASSWORD</h1>
    <button @click="getAccessToken">1.获取access_token</button>
    <button @click="getApiData">2.获取接口数据</button>
    <div>{{ api_data }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KeycloakOauth2Password',
  props: {
    msg: String
  },
  data() {
    return {
      api_data: {}
    }
  },
  methods: {
    // 获取access_token
    getAccessToken() {
      const querystring = require('querystring');
      const token_url = '/authhost/realms/realm_test_01/protocol/openid-connect/token'
      axios.post(token_url,
        querystring.stringify({
          grant_type: 'password',
          username: 'u1',
          password: 'p1',
          client_id: 'client_test_01'
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        sessionStorage.setItem('access_token', response.data.access_token)
        console.info(sessionStorage.getItem('access_token'))
      });
    },
    // 获取接口数据
    getApiData() {
      var self = this
      const data_url = '/datahost/test/hello'
      const access_token = sessionStorage.getItem('access_token')
      console.info(access_token)
      axios.get(data_url, {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }).then(function (response) {
        console.info(response.data)
        self.api_data = response.data
      }).catch(function (error) {
        self.api_data = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
