<template>
  <div>
    <h1>spring_oauth2_code_callback</h1>
    <button @click="getAuthCode">1.返回authorization_code</button>
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
  name: "SpringOauth2CodeCallback",
  data() {
    return {
      code: '',
      access_token: ''
    };
  },
  methods: {
    /**
     * 获取授权码
     */
    getAuthCode() {
      const querystring = require("querystring");
      let parse = querystring.parse(location.search);
      this.code = parse["?code"];
      this.Oauth2.authorizationGrantType.authorizationCode.authorizeEndpoint.code = this.code;
      this.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint.config.code = this.code;
      localStorage.setItem("code", this.code);
      console.info(parse);
    },
    /**
     * 获取access_token
     */
    getAccessToken() {
      let self = this;
      let tokenEndpoint = this.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint;
      console.info(tokenEndpoint)
      // return
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
          self.access_token = response.data.access_token;
          tokenEndpoint.access_token = self.access_token;
          localStorage.setItem("access_token", self.access_token);
          console.info('[dialog] [access_token] <= '+localStorage.getItem("access_token"));
          console.info('[oauth2] [access_token] <= '+self.Oauth2.authorizationGrantType.authorizationCode.tokenEndpoint.access_token);
          // 关窗
          window.close();
        }).catch(function(error){
          console.info(error);
        });
    },
  },
};
</script>