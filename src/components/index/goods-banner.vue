<template>
  <div class="banner">
    <mt-swipe :show-indicators="false" @change="handleChange">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <div class="img">
          <img :src="item" alt="">
        </div>
      </mt-swipe-item>
    </mt-swipe>
    <div class="num" v-if="imgs.length">{{i}}/{{imgs.length}}</div>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      i: 1
    }
  },
  methods: {
    handleChange(i) {
      this.i = i + 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.banner{
  height: size(360);
  position: relative;
  .num{
    position: absolute;
    right: size(24);
    bottom: size(32);
    background: #666;
    color:#fff;
    font-size: 12px;
    padding:2px 6px;
    border-radius: 7px;
    transform: scale(.9);
  }
}
.img{
  height: 100%;
  background: #fff;
  img{
    display: block;
    @include fill;
  }
}
</style>