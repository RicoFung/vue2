<template>
    <div>
        <h1>oauth2_code</h1>
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
    // 获取授权码
    getAuthCode() {
      alert("test")
      // const authcode_url = '/authost/realms/realm_test_01/protocol/openid-connect/auth?client_id=client_test_02&redirect_uri=http://10.12.77.52:1234/&response_type=code&scope=openid'
      // window.location.href = authcode_url

    }
  }
}
</script>