<template>
  <div>
    <goods-banner></goods-banner>
    <div class="navs border-top border-bottom">
      <router-link tag="span" to="price">价格</router-link>
      <router-link tag="span" to="detail">详情</router-link>
      <router-link tag="span" to="buy-records">购买记录</router-link>
      <router-link tag="span" to="visitor">访客</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GoodsBanner from './goods-banner'
export default {
  components: {
    GoodsBanner
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.navs{
  text-align: center;
  font-size: 0;
  >span{
    display: inline-block;
    font-size: size(30);
    color: #666;
    padding: size(40) size(30);
    position: relative;
    &.router-link-active{
      color:#333;
      font-weight: 800;
      &:after{
        content: ' ';
        display: block;
        position: absolute;
        left: 50%;
        width: 36%;
        transform: translateX(-50%);
        height: 3px;
        background: $color-main;
        bottom: size(24);
      }
    }
  }
}
</style>