<template>
  <div class="goods-item" :class="{free: item.is_platoon === 1,news:item.newbornzone.is_newborn}">
    <router-link tag="div" class="img-wrap" :to="'/goods/'+item.id">
      <img v-lazy="item.image" alt />
    </router-link>
    <router-link tag="div" class="con" :to="'/goods/'+item.id">
      <div class="name" >{{item.store_name}}</div>
      <div class="price-num">
        <span class="price">¥{{item.newbornzone.is_newborn?item.newbornzone.price:item.price}}</span>
        <span class="pre_price">{{item.ot_price}}</span>
      </div>
      <div class="price-mount">
        <span class="num">销量{{item.sales}}</span>
        <span class="buy">购买</span>
      </div>
    </router-link>
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
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.goods-item {
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  // padding: size(20);
  // margin-left: size(20);
  .img-wrap {
    position: relative;
    height: size(220);
    img {
      @include fill;
      width: 100%;
      height: 100%;
      border-radius: size(8);
    }
  }
  .con {
    padding: size(10);
    
    overflow: hidden;
  }
  .name {
    margin-top: size(0);
    font-size: size(26);
    color: #4a4a4a;
    line-height: size(34);
    height: size(68);
    @include txt-overflow(2);
    text-align: justify;
  }
  .price-num {
    line-height: size(30);
    margin: size(8) 0;
    .price {
      font-size: size(20);
      color: #ff5500;
    }
    .pre_price {
      font-size: size(20);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
      line-height: size(33);
      text-decoration: line-through;
      margin-left: size(10);
    }
  }
  .price-mount {
    display: flex;
    height: size(38);
    align-items: center;
    justify-content: space-between;
 
    .num {
      font-size: size(20);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
      line-height: size(28);
      text-shadow: 0 size(2) size(7) rgba(0, 0, 0, 0.06);
    }
    .buy {
      width: size(80);
      height: size(38);
      background: rgba(231, 55, 42, 1);
      box-shadow: 0 size(2) size(7) 0 rgba(0, 0, 0, 0.06);
      border-radius: size(2);
      font-size: size(20);
      text-align: center;
      line-height: size(38);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  // 免单标签
  position: relative;
  &.free {
    &:after {
      content: "免单";
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
  &.news {
    &:before {
      content: "新人专享";
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