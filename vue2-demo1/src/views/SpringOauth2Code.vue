<template>
  <div>
    <h1>SPRING_OAUTH2_CODE</h1>
    <div>
      <button @click="loginDialog">1.登录</button>
      <button @click="getApiData">2.取数</button>
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
  name: "SpringOauth2Code",
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
      // 清空表单域
      this.api_data = {}
      // 执行登录
      this.AuthorizationCode.authorize()  
    },

    /**
     * 获取接口数据
     *  */ 
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

    /**
     * 登出
     *  */ 
    logout() {
      // 清空表单域
      this.api_data = {}
      // 执行登出
      this.AuthorizationCode.logout()
    }
  },
};
</script>