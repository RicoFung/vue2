<template>
  <div>
    <h1>KEYCLOAK_OAUTH2_CODE</h1>
    <button @click="login">1.登录</button>
    <button @click="getAuthCode">2.获取authorization_code</button>
    <button @click="getAccessToken">3.获取access_token</button>
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
  name: "KeycloakOauth2Code",
  data() {
    return {
      authorization_code: { state: "", code: "" },
      access_token: "",
      api_data: {}
    };
  },
  methods: {
    /**
     * 登录
     */
    login() {
      const querystring = require("querystring");
      // 回调url(必须与keycloak配置一致)
      // let redirect_uri = window.location.protocol + "//" + window.location.host + "/#" + this.$route.path
      let redirect_uri = window.location.protocol + "//" + "10.12.77.66:7090" + "/" + this.$route.path
      // 此处必须显式写授权服务器域名，不可用vue.config.js中配置的proxy
      let authcode_url =
        "http://keycloakhost:9090/realms/realm_test_01/protocol/openid-connect/auth?";
      authcode_url += querystring.stringify({
        client_id: "client_test_02",
        redirect_uri: redirect_uri,
        response_type: "code",
        scope: "openid",
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
      this.authorization_code.state = parse["?session_state"];
      this.authorization_code.code = parse["code"];
      sessionStorage.setItem("state", parse["?session_state"]);
      sessionStorage.setItem("code", parse["code"]);
      console.info(parse);
    },
    /**
     * 获取access_token
     */
    getAccessToken() {
      var self = this;
      // 回调url(必须与keycloak配置一致)
      // let redirect_uri = window.location.protocol + "//" + window.location.host + "/#" + this.$route.path
      let redirect_uri = window.location.protocol + "//" + "10.12.77.66:7090" + "/" + this.$route.path
      let code = sessionStorage.getItem("code");
      const querystring = require("querystring");
      const token_url =
        "/authhost/realms/realm_test_01/protocol/openid-connect/token";
      axios
        .post(
          token_url,
          querystring.stringify({
            grant_type: "authorization_code",
            client_id: "client_test_02",
            code: code,
            redirect_uri: redirect_uri,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (response) {
          self.access_token = response.data.access_token;
          sessionStorage.setItem("access_token", response.data.access_token);
          console.info(sessionStorage.getItem("access_token"));
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
        self.api_data = JSON.stringify(response.data)
      }).catch(function (error) {
        self.api_data = JSON.stringify(error)
      })
    },
  },
};
</script>