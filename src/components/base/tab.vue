<template>
  <div class="tab" ref="tab">
    <router-link to="/index" tag="div" replace>
      <div class="icon home"></div>
      <div class="name">商城</div>
    </router-link>
    <router-link to="/order" tag="div" replace>
      <div class="icon order"></div>
      <div class="name">订单</div>
    </router-link>
    <router-link to="/income" tag="div" replace>
      <div class="icon income"></div>
      <div class="name">积分</div>
    </router-link>
    <router-link to="/me" tag="div" replace v-if="role === 1">
      <div class="icon me"></div>
      <div class="name">我的</div>
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['role'])
  }
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
  background: rgba(255,255,255,0.78);
  box-shadow: 0 0px 1px 1px rgba(0,0,0,0.1);
  >div{
    flex: 1;
  }
  .icon{
    display: block;
    margin: 0 auto 0;
    width: size(44);
    height: size(44);
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
    font-size: size(20);
    color: #666;
  }
  // 毛玻璃
  // &:before{
  //   content: ' ';
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   top: 0;
  //   position: absolute;
  //   background: inherit;
  //   background-attachment: fixed;
  //   filter: blur(4px);
  //   z-index: -1;
  // }
  // ui 说用这个背景图做毛玻璃效果
  @include bg('~img/tab-bg.png');
}
</style>