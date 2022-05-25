<template>
    <div>
        <h1>oauth2_code</h1>
    <button @click="login">登录</button>
    <button @click="getAuthCode">获取授权码</button>
    <div>{{ api_data }}</div>
    </div>
</template>

<script>
export default {
  name: 'Oauth2Code',
  data() {
    return {
      api_data: {}
    }
  },
  methods: {
    /**
     * 登录
     */ 
    login() {
      const querystring = require('querystring');
      // 回调url
      let redirect_uri = window.location.protocol + "//" + window.location.host + "/#" + this.$route.path
      // 此处必须显式写授权服务器域名，不可用vue.config.js中配置的proxy
      let authcode_url = 'http://keycloakhost:9090/realms/realm_test_01/protocol/openid-connect/auth?'
      authcode_url += querystring.stringify({
        client_id: 'client_test_02',
        redirect_uri: redirect_uri,
        response_type: 'code',
        scope: 'openid'
      });
      // 执行跳转
      location.href = authcode_url
    },
    /**
     * 获取授权码
     */
    getAuthCode() {
      const querystring = require('querystring');
      let parse = querystring.parse(location.search)
      this.api_data = parse
      console.info(parse)
    }
  }
}
</script>