<template>
  <div class="tab-wrap">
    <div class="tab"
         ref="tab">
      <router-link to="/index"
                   tag="div"
                   replace>
        <div class="icon home"></div>
        <div class="name">首页</div>
      </router-link>
      <router-link to="/game"
                   tag="div"
                   replace>
        <div class="icon order"></div>
        <div class="name">游戏</div>
      </router-link>
      <!-- <router-link to="/income" tag="div" replace>
      <div class="icon income"></div>
      <div class="name">收益</div>
    </router-link> -->
      <router-link to="/me"
                   tag="div"
                   replace>
        <div class="icon me"></div>
        <div class="name">我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.tab-wrap {
  height: size(166);
  background: white;
  position: fixed;
  left: size(22);
  right: size(22);
  bottom: 0;
  z-index: 9;
  border-radius: size(16) size(16) 0 0;
  .tab {
    height: size(110);
    margin: size(22) size(72) 0;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: size(55);
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
    > div {
      flex: 1;
    }
    .icon {
      display: block;
      margin: 0 auto 0;
      width: size(44);
      height: size(44);
      margin-bottom: size(10);
      &.home {
        @include bg("~img/tab/home.png");
      }
      &.order {
        @include bg("~img/tab/game.png");
      }
      &.income {
        @include bg("~img/tab/home_income_sel.png");
      }
      &.me {
        @include bg("~img/tab/mine.png");
      }
    }
    .router-link-active {
      .icon {
        &.home {
          @include bg("~img/tab/home_sel.png");
        }
        &.order {
          @include bg("~img/tab/game_sel.png");
        }
        &.income {
          @include bg("~img/tab/home_income.png");
        }
        &.me {
          @include bg("~img/tab/mine_sel.png");
        }
      }
      .name {
        color: $color-main;
      }
    }
    .name {
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
    @include bg("~img/tab-bg.png");
  }
}
</style>