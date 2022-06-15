<template>
  <div>
    <h1>spring_oauth2_code</h1>
    <div>
      <button @click="loginDialog">1.弹窗登录</button>
    </div>
    <div>
      <button @click="login">1.登录</button>
      <button @click="getAuthCode">2.获取authorization_code</button>
      <button @click="getAccessToken">3.获取access_token</button>
    </div>
    <button @click="getApiData">4.获取接口数据</button>

    <div>
      <div>state:</div>
      <input style="width: 600px" v-model="authorization_code.state" />
      <div>code:</div>
      <textarea
        style="width: 600px; height: 50px"
        v-model="authorization_code.code"
      ></textarea>
    </div>
    <div>
      <div>access_token:</div>
      <textarea
        style="width: 600px; height: 300px"
        v-model="access_token"
      ></textarea>
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
  name: "SpringOauth2Code",
  data() {
    return {
      // 由于spring-authorization-server限制，必须用ip或域名访问（如：http://127.0.0.1:7090），不可用localhost
      // redirect_uri: window.location.protocol + '//' + window.location.host + this.$router.resolve({name: 'SpringOauth2CodeCallback'}).href,
      redirect_uri: this.Oauth2.authorizationGrantType.authorizationCode.authorizeEndpoint.config.redirect_uri,
      authorization_code: { state: "", code: "" },
      access_token: "",
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
      let authcode_url = authorizeEndpoint.url + querystring.stringify(authorizeEndpoint.config);
      // 弹窗
      var iHeight = 800;
      var iWidth = 600; 
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
      window.open(authcode_url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
    },

    /**
     * 登录
     */
    login() {
      const querystring = require("querystring");
      // 回调url
      // 由于spring-authorization-server限制，必须用ip或域名访问（如：http://127.0.0.1:7090），不可用localhost
      let redirect_uri =
        window.location.protocol +
        "//" +
        window.location.host 
        +
        "/" +
        this.$route.path
        ;
      // location.href 此处必须显式写授权服务器域名，不可用vue.config.js中配置的proxy
      let authcode_url = "http://auth-server:9000/oauth2/authorize?";
      authcode_url += querystring.stringify({
        client_id: "rico-client",
        client_secret: "123",
        response_type: "code",
        scope: "openid test.read",
        redirect_uri: redirect_uri,
      });
      // 执行跳转
      location.href = authcode_url;
    },
    /**
     * 获取授权码
     */
    getAuthCode() {
      const querystring = require("querystring");
      let parse = querystring.parse(location.search);
      this.authorization_code.code = parse["?code"];
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
      var base64encodedData = Buffer.from(user + ':' + password).toString('base64');
      // 回调url
      let redirect_uri =
        window.location.protocol +
        "//" +
        window.location.host 
        +
        "/" +
        this.$route.path
        ;
      let code = localStorage.getItem("code");
      const querystring = require("querystring");
      const token_url = "/springauthhost/oauth2/token";
      // 请求
      axios
        .post(
          token_url,
          querystring.stringify({
            grant_type: "authorization_code",
            client_id: "rico-client",
            code: code,
            redirect_uri: redirect_uri,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic " + base64encodedData
            },
          }
        )
        .then(function (response) {
          self.access_token = response.data.access_token;
          localStorage.setItem("access_token", response.data.access_token);
          console.info(localStorage.getItem("access_token"));
        });
    },
    // 获取接口数据
    getApiData() {
      var self = this
      const data_url = '/springdatahost/test/hi'
      const access_token = localStorage.getItem('access_token')
      console.info('[localStorage] [access_token]: ' + access_token)
      // return
      axios.get(data_url, {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }).then(function (response) {
        console.info(response.data)
        self.api_data = JSON.stringify(response.data)
      }).catch(function (error) {
        self.api_data = JSON.stringify(error)
      })
    },
  },
};
</script>