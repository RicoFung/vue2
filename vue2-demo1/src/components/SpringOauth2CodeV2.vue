<template>
  <div>
    <h1>SPRING_OAUTH2_CODE_V2</h1>
    <div>
      <button @click="loginDialog">1.弹窗登录</button>
      <button @click="getApiData">2.获取接口数据</button>
      <button @click="logout">3.登出</button>
    </div>
    <div>
      <div>api_data:</div>
      <textarea
        style="width: 600px; height: 300px"
        v-model="api_data"
      ></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SpringOauth2CodeV2",
  data() {
    return {
      api_data: {}
    };
  },
  mounted() {
  },
  methods: {
    /**
     * 弹窗登录
     */
    loginDialog() {      
      const querystring = require("querystring");
      let authorizeEndpoint = this.Oauth2.authorizationGrantType.authorizationCode.authorizeEndpoint;
      let url = authorizeEndpoint.url + querystring.stringify(authorizeEndpoint.config);

      var iHeight = 600;
      var iWidth = 800; 
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
      window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
    },

    // 获取接口数据
    getApiData() {
      var self = this
      const url = '/springdatahost/test/hi'
      const access_token = localStorage.getItem('access_token')
      axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }).then(function (response) {
        // debugger
        self.api_data = JSON.stringify(response.data)
      }).catch(function (error) {
        // debugger
        self.api_data = JSON.stringify(error.response.data)
      })
    },

    // 登出
    logout() {
      const querystring = require("querystring");
      // 清空本地access_token
      localStorage.setItem('access_token', '');
      this.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint.access_token = '';
      
      let logoutEndpoint = this.Oauth2.authorizationGrantType.authorizationCode.logoutEndpoint;
      let url = logoutEndpoint.url + querystring.stringify(logoutEndpoint.config);
      // let url = 'http://auth-server:9000/logout?' + querystring.stringify(logoutEndpoint.config);

      var iHeight = 600;
      var iWidth = 800; 
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
      window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
    }
  },
};
</script>