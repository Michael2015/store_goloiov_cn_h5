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
      default: () => ['https://storemp.golodata.com/public/uploads/attach/2019/04/25/5cc10d7f80a66.png', 'https://storemp.golodata.com/public/uploads/attach/2019/04/25/5cc115121901d.png']
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
  height: size(630);
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