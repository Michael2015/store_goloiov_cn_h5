<template>
  <div class="goods-item" :class="{free: item.is_platoon === 1}">
    <router-link tag="div" class="img-wrap" :to="'/goods/'+item.id"><img :src="item.image" alt=""></router-link>
    <div class="con">
      <router-link tag="div" class="name" :to="'/goods/'+item.id">{{item.store_name}}</router-link>
      <div class="price-num">
        <span class="price">¥{{item.price}}</span>
        <span class="num">销量{{item.sales}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.goods-item{
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  width: 47%;
  margin-left: 2.95%;
  .img-wrap{
    position: relative;
    padding-bottom: 100%;
    img{
      position: absolute;
      @include fill;
      left: 0;
      top:0;
    }
  }
  .con{
    padding: 0 size(16);
  }
  .name{
    margin-top: size(20);
    font-size: size(28);
    color: #4a4a4a;
    line-height: size(34);
    height: size(68);
    @include txt-overflow(2);
  }
  .price-num{
    line-height: size(42);
    margin: size(26) 0;
    .price{
      font-size: sizeZ(30);
      color: #ff5500;
    }
    .num{
      float:right;
      font-size: size(22);
      color: #c7c7c7;
    }
  }
  // 免单标签
  position: relative;
  &.free{
    &:after{
      content: '免单';
      position: absolute;
      height: size(32);
      line-height: size(32);
      background: #ff0000;
      right: size(-62);
      top: size(-28);
      color: #fff;
      font-size: size(22);
      width: size(120);
      text-align: center;
      transform-origin: 0% 0%;
      transform: rotateZ(45deg);
    }
  }
}
</style>