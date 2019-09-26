<template>
  <div class="banner">
    <mt-swipe :show-indicators="true">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <div class="img">
          <img :src="item" alt="">
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
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