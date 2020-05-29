<template>
  <div class="goods-item" :class="{free: item.is_platoon === 1,news:item.newbornzone.is_newborn}">
    <router-link tag="div" class="img-wrap" :to="'/goods/'+item.id">
      <img v-lazy="item.image" alt="">
    </router-link>
    <div class="con">
      <router-link tag="div" class="name" :to="'/goods/'+item.id">{{item.store_name}}</router-link>
      <div class="price-num">
        <span class="price">¥{{item.newbornzone.is_newborn?item.newbornzone.price:item.price}}</span>
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
  width: 100%;
  padding: size(20);
  margin-left: size(20);
  .img-wrap{
    position: relative;
    height: 100%;
    float: left;
    margin-right: 5%;
    img{
      @include fill;
      width: size(180);
      height: size(180);
      border-radius: size(8);
    }
  }
  .con{
    padding:size(20);
    height:size(180);
    overflow: hidden;
  }
  .name{
    margin-top: size(0);
    font-size: size(26);
    color: #4a4a4a;
    line-height: size(34);
    height: size(68);
    @include txt-overflow(2);
    text-align:justify;
  }
  .price-num{
    line-height: size(42);
    margin: size(20) 0;
    .price{
      font-size: size(30);
      color: #ff5500;
    }
    .num{
      float:right;
      font-size: size(16);
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
  // 新人专享标签
  &.news{
    &:before{
      content: '新人专享';
      position: absolute;
      height: size(32);
      line-height: size(32);
      background: #ff0000;
      color: #fff;
      font-size: size(22);
      width: size(120);
      text-align: center;
      transform-origin: 0% 0%;
      z-index: 1;
    }
  }
}
</style>