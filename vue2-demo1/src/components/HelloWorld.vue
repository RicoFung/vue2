<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
          rel="noopener">babel</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <button @click="getAccessToken">获取access_token</button>
    <button @click="getApiData">获取接口数据</button>
    <div>{{ api_data }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
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
        localStorage.setItem('access_token', response.data.access_token)
        console.info(localStorage.getItem('access_token'))
      });
    },
    // 获取接口数据
    getApiData() {
      var self = this
      const data_url = '/datahost/test/hello'
      const access_token = localStorage.getItem('access_token')
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
