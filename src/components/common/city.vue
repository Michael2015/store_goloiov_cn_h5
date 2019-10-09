<template>
  <div v-show="isShow">
    <div class="mask"></div>
    <div class="city-wrap">
      <div class="title border-bottom">所在地区<img src="~img/close.png" alt="" class="close" @click="hide"></div>
      <div class="col border-bottom result">
        <div class="one blank">请选择</div>
        <div class="two">3</div>
        <div class="three">3</div>
      </div>
      <div class="list">
        <div class="col border-bottom" v-for="item in 100" :key="item">
          <div class="one">北京</div>
          <div class="two">北京</div>
          <div class="three">北京</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
export default {
  mixins: [showHide],
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.city-wrap{
  background: #fff;
  min-height: 100px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 999;
  min-height: 300px;
  .title{
    line-height: size(100);
    font-size: size(28);
    font-weight: 800;
    padding: 0 size(20);
    position: relative;
    .close{
      float: right;
      width: size(30);
      margin-top: size(32);
    }
  }
  .list{
    height: size(80 * 8);
    overflow: scroll;
  }
  .col{
    line-height: size(80);
    height: size(80);
    padding: 0 size(16);
    >div{
      float: left;
      width: 33.3%;
      text-align: center;
      padding: 0 size(10);
      @include txt-overflow;
      font-size: size(28);
    }
    &.result{
      .blank{
        color: #e31436;
        position: relative;
        &:after{
          content: ' ';
          display: block;
          position: absolute;
          width: size(80);
          height: 2px;
          bottom:0;
          left: 50%;
          transform: translateX(-50%);
          background: #e31436;
        }
      }
    }
  }
}
</style>