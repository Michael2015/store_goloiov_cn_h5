<template>
  <div class="top-head-wrap">
    <div class="top-head table border-bottom" :class="{transparent: transparent&&!noTransparent}" :style="bg">
      <div class="left" @click="$router.back()">
        <img src="~img/icon/back.png" alt="" class="back">
      </div>
      <div class="mid">
        <div class="text"><slot></slot>&nbsp;</div>
      </div>
      <div class="right">
        <div class="v">
          <div class="w"><slot name="right"></slot></div>
        </div>
      </div>
    </div>
    <div class="blank" v-if="!transparent"></div>
  </div>
</template>

<script>
import {getScrollTop} from 'lib'
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bg: '',
      noTransparent: false
    }
  },
  created() {
    if (this.transparent) {
      this.scroll = () => {
        const top = getScrollTop()
        let opacity = 1
        if (top < 100) {
          opacity = (top / 100).toFixed(2)
          this.bg2 = ''
          this.noTransparent = false
        } else {
          this.noTransparent = true
        }
        this.bg = 'background:rgba(256,256,256, '+ opacity +');'
      }
      window.addEventListener('scroll', this.scroll)
    }
  },
  beforeDestroy() {
    if (this.scroll) {
      window.removeEventListener('scroll', this.scroll)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.top-head-wrap{
  .blank{
    height: size(88);
  }
  .top-head{
    position: fixed;
    left: 0;
    top: 0;
    height: size(88);
    background: #fff;
    z-index: 9;
    padding: 0 size(32);
    padding-left: 0;
    >div{
      display: table-cell;
      vertical-align: middle;
    }
    &.transparent{
      background: transparent;
      &:after{
        background: transparent;
      }
    }
  }
  .left{
    width: size(100);
    text-align: left;
  }
  .mid{
    text-align: center;
    font-size: size(30);
    color: #000;
    .text{
      @include txt-overflow;
    }
  }
  .back{
    width: size(34);
    display: inline-block;
    margin-left: size(20);
  }
  .right{
    width: size(100 - 32);
    .v{
      width: 100%;
      height: 100%;
      position: relative;
      .w{
        position: absolute;
        right: 0;
        top: 50%;
        width: size(150);
        text-align: right;
        transform: translateY(-50%);
      }
    }
  }
}
</style>