<template>
  <div>
    <h1>spring_oauth2_code_callback</h1>
    <button @click="getAuthCode">1.返回authorization_code</button>
    <button @click="getAccessToken">2.获取access_token</button>
    <div>
      <div>code:</div>
      <textarea
        style="width: 600px; height: 50px"
        v-model="oauth2.client.config.code"
      ></textarea>
    </div>
    <div>
      <div>access_token:</div>
      <textarea
        style="width: 600px; height: 300px"
        v-model="oauth2.client.access_token.val"
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
      oauth2: {
        client : { 
          config: {
            client_id: 'rico-client',
            grant_type: 'authorization_code',
            redirect_uri: window.location.protocol + '//' + window.location.host + this.$router.resolve({name: 'SpringOauth2CodeCallback'}).href,
            code: ''
          },
          access_token: {
            url: '/springauthhost/oauth2/token',
            val: ''
          }
        }
      },
    };
  },
  mounted: function() {
    console.log("hi callback");
    // this.login();
  },
  methods: {
    /**
     * 弹窗登录
     */
    // login() {
    //   const querystring = require("querystring");
    //   // 回调url
    //   // 由于spring-authorization-server限制，必须用ip或域名访问（如：http://127.0.0.1:7090），不可用localhost
    //   let redirect_uri =
    //     window.location.protocol +
    //     "//" +
    //     window.location.host 
    //     + "/SpringOauth2CodeCallback"
    //     // +
    //     // "/#" +
    //     // this.$route.path
    //     ;
    //   // let redirect_uri = this.$router.resolve({name: 'SpringOauth2CodeCallback'}).href;
    //   // location.href 此处必须显式写授权服务器域名，不可用vue.config.js中配置的proxy
    //   let authcode_url = "http://auth-server:9000/oauth2/authorize?";
    //   authcode_url += querystring.stringify({
    //     client_id: "rico-client",
    //     client_secret: "123",
    //     response_type: "code",
    //     scope: "openid test.read",
    //     redirect_uri: redirect_uri,
    //   });
    //   // 执行跳转
    //   location.href = authcode_url;
    // },
    /**
     * 获取授权码
     */
    getAuthCode() {
      const querystring = require("querystring");
      let parse = querystring.parse(location.search);
      this.oauth2.client.config.code = parse["?code"];
      localStorage.setItem("code", parse["?code"]);
      console.info(parse);
    },
    /**
     * 获取access_token
     */
    getAccessToken() {
      var self = this;
      // Basic Auth
      let user = 'rico-client'
      let password = '123'
      let base64encodedData = Buffer.from(user + ':' + password).toString('base64');
      const querystring = require("querystring");
      // 请求
      axios
        .post(
          this.oauth2.client.access_token.url,
          querystring.stringify(this.oauth2.client.config),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic " + base64encodedData
            },
          }
        )
        .then(function (response) {
          self.oauth2.client.access_token.val = response.data.access_token;
          localStorage.setItem("access_token", self.oauth2.client.access_token.val);
          parent.console.info('[dialog] [access_token] <= '+localStorage.getItem("access_token"));

          // 关窗
          window.close();
        }).catch(function(error){
          console.log(error.toJSON());
        });
    },
  },
};
</script>