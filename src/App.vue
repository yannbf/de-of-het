<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'styles';

body {
  margin: 0;
  background: $app-background;
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-text-primary;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $router-link;
    &.router-link-exact-active {
      color: $router-link-active;
    }
  }
}
</style>
