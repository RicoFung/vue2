<template>
  <div id="app">
    <div id="logo" class="show">
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <div id="router-link" class="show">
      <router-link to="/">home</router-link> |
      <router-link to="/keycloak-oauth2-password">keycloak-oauth2-password</router-link> |
      <router-link to="/keycloak-oauth2-code">keycloak-oauth2-code</router-link> |
      <router-link to="/keycloak-oauth2-code-pkce">keycloak-oauth2-code-pkce</router-link> |
      <router-link to="/spring-oauth2-code-v1">spring-oauth2-code-v1</router-link> |
      <router-link to="/spring-oauth2-code-v2">spring-oauth2-code-v2</router-link> |
    </div>
    <div id="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.show {
  display: inline;
}
.hide {
  display: none;
}
</style>
