<template>
  <div class="tab border-top">
    <router-link to="/index" tag="div" replace>
      <div class="icon home"></div>
      <div class="name">首页</div>
    </router-link>
    <router-link to="/order" tag="div" replace>
      <div class="icon order"></div>
      <div class="name">订单</div>
    </router-link>
    <router-link to="/income" tag="div" replace>
      <div class="icon income"></div>
      <div class="name">收益</div>
    </router-link>
    <router-link to="/me" tag="div" replace>
      <div class="icon me"></div>
      <div class="name">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.tab{
  height: size(100);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: #fff;
  box-shadow: 0 0px 1px 2px rgba(0,0,0,.01);
  >div{
    flex: 1;
  }
  .icon{
    display: block;
    margin: 0 auto 0;
    width: size(46);
    height: size(46);
    margin-bottom: size(10);
    &.home{
      @include bg('~img/tab/home_mall_sel.png');
    }
    &.order{
      @include bg('~img/tab/home_Order_sel.png');
    }
    &.income{
      @include bg('~img/tab/home_income_sel.png');
    }
    &.me{
      @include bg('~img/tab/home_mine_sel.png');
    }
  }
  .router-link-active{
    .icon{
      &.home{
        @include bg('~img/tab/home_mall.png');
      }
      &.order{
        @include bg('~img/tab/home_Order.png');
      }
      &.income{
        @include bg('~img/tab/home_income.png');
      }
      &.me{
        @include bg('~img/tab/home_mine.png');
      }
    }
    .name{
      color: $color-main;
    }
  }
  .name{
    font-size: size(24);
    color: #666;
  }
}
</style>