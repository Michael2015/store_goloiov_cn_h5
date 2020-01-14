<template>
  <div class="banner">
    <mt-swipe :show-indicators="true">
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <router-link class="img" :to="item.app_url">
          <img :src="item.pic" alt="">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import {getBanner} from 'api'
export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      banner: []
    }
  },
  created() {
    getBanner().then(data => {
      if (data) {
        this.banner = data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.banner{
  padding: size(20);
  height: size(300);
  .img{
    height: 100%;
    background: #fff;
    img{
        border-top-left-radius: size(30);
        border-bottom-right-radius: size(30);
        display: block;
        @include fill;
    }
  }
}
</style>