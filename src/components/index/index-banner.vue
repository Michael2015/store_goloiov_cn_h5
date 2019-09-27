<template>
  <div class="banner">
    <mt-swipe :show-indicators="true">
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <div class="img">
          <img :src="item.pic" alt="">
        </div>
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
  height: size(300);
  .img{
    height: 100%;
    background: #fff;
    img{
      display: block;
      @include fill;
    }
  }
}
</style>