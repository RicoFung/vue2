<template>
  <div>
    <h1>spring_oauth2_code_callback</h1>
    <button @click="getCode">1.返回authorization_code</button>
    <button @click="getAccessToken">2.获取access_token</button>
    <div>
      <div>code:</div>
      <textarea
        style="width: 600px; height: 50px"
        v-model="code"
      ></textarea>
    </div>
    <div>
      <div>access_token:</div>
      <textarea
        style="width: 600px; height: 300px"
        v-model="access_token"
      ></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Callback",
  data() {
    return {
      // 授权码
      code: '',
      // 访问令牌
      access_token: ''
    };
  },
  mounted() {
      // 隐藏不必要ui element
      document.getElementById("logo").className = 'hide'
      document.getElementById("router-link").className = 'hide'
      // 获取code成功后，自动获取access_token
      let r = this.getCode();
      if (r == true) {
        this.getAccessToken();
      }
  },
  methods: {
    /**
     * 获取授权码
     */
    getCode() {
      const querystring = require("querystring");
      let parse = querystring.parse(location.search);

      console.info(parse);

      this.code = parse["?code"];      
      if (this.code !== null || this.code !== undefined || this.code !== '') {
        this.Oauth2.authorizationGrantType.authorizationCode.authorizeEndpoint.code = this.code;
        this.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint.config.code = this.code;
        localStorage.setItem("code", this.code);
        return true;
      } else {
        return false;
      }
    },
    /**
     * 获取访问令牌
     */
    getAccessToken() {
      let self = this;
      let tokenEndpoint = this.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint;
      const querystring = require("querystring");
      // 请求
      axios
        .post(
          tokenEndpoint.url,
          querystring.stringify(tokenEndpoint.config),
          {
            headers: tokenEndpoint.headers,
          }
        )
        .then(function (response) {
          // 回写
          self.access_token = response.data.access_token;
          tokenEndpoint.access_token = self.access_token;
          localStorage.setItem("access_token", self.access_token);
          // console.info('[dialog] [access_token] <= '+localStorage.getItem("access_token"));
          // console.info('[oauth2] [access_token] <= '+self.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint.access_token);
          // 关窗
          window.close();
        }).catch(function(error){
          self.access_token = JSON.stringify(error);
          tokenEndpoint.access_token = '';
          localStorage.setItem("access_token", '');
        });
    },
  },
};
</script>

<style>
</style>