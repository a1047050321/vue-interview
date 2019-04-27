<template>
  <div id="app">
    <div id="nav">
      <a>test系统</a>
      <router-link to="/">Home</router-link>
      <router-link to="/test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  text-align:left;
  a {
    display: inline-block;
    padding: 10px;
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
      border-bottom:1px solid #42b983;
    }
  }
}
</style>
