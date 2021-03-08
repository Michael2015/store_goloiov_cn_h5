<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab v-if="$route.meta.haveTab"></tab>
  </div>
</template>

<script>
import tab from 'com/base/tab.vue'
import { tryLogin } from 'api/login'
export default {
  name: 'app',
  components: {
    tab
  },
  beforeCreate() {
    tryLogin()
  }
}
</script>

<style lang="scss">
@import "~css/app";
@import "~css/iconfont";
@import "~css/resetMint";
#app {
  width: 100%;
  height: 100%;
}
#nprogress .bar {
  background-image: linear-gradient(
    236deg,
    #ef5456 0%,
    #e70002 100%
  ) !important;
}
</style>

