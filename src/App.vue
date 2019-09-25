<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab v-if="$route.meta.haveTab"></tab>
  </div>
</template>

<script>
import tab from 'com/base/tab.vue'
export default {
  name: 'app',
  components: {
    tab
  }
}
</script>

<style lang="scss">
  @import '~css/app';
  #app{
    width: 100%;
    height: 100%;
  }
</style>
