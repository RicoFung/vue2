<template>
  <div>
    <h1>spring_oauth2_code_pkce_callback</h1>
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

export default {
  name: "CallbackPkce",
  data() {
    return {
      // 授权码
      code: '',
      // 访问令牌
      access_token: ''
    };
  },
  mounted() {
      // 隐藏不必要 ui element
      document.getElementById("logo").className = 'hide'
      document.getElementById("router-link").className = 'hide'
      // 自动获取 code 成功后，自动获取 access_token
      var self = this
      // 1. 取 code
      let r = this.AuthorizationCodePkce.getCode(function(code) {
        self.code = code
      })
      // 2. 取 access_token
      if (r == true) {
        this.AuthorizationCodePkce.token(function(access_token) {
          self.access_token = access_token
        })
      }
  },
  methods: {
    // 手动获取 code
    getCode() {
      var self = this
      this.AuthorizationCodePkce.getCode(function(code) {
        self.code = code
      })
    },
    // 手动获取 access_token
    getAccessToken() {
      var self = this
      this.AuthorizationCodePkce.token(function(access_token) {
        self.access_token = access_token
      })
    }
  },
};
</script>

<style>
</style>