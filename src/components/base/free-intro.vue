<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="title">golo技师盒子</div>
        <div class="sub-title">免单规则</div>
        <div class="con">
          <div>排队免单规则：6出1，即是在你下单后，如有新的6笔订单，商家即全额返还你支付的订单金额作为奖励。</div>
          <div>快速免单规则：3出1，即是在你下单后，如你推荐了新的3笔订单，商家即全额返还你支付的订单金额作为奖励。</div>
        </div>
        <div class="btns">免单奖励介绍</div>
        <div class="close" @click="hide" v-if="false"></div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
import popup from 'ui/popup'
export default {
  components: {
    popup
  },
  mixins: [showHide],
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  background: #fff;
  width: p(604/750);
  min-height: 100px;
  border-radius: size(16);
  overflow: hidden;
  text-align: center;
  line-height: 1.4;
  position: relative;
  .title{
    font-size: size(30);
    color: #373737;
    padding: size(44) size(50) 0;
    font-weight: 800;
    @include txt-overflow(2);
  }
  .sub-title{
    color: #5297e7;
    font-size: size(26);
    margin-top: size(8);
    text-decoration: underline;
  }
  .con{
    padding: size(24) size(24) size(30);
    color: #666;
    font-size: size(26);
    text-align: left;
    >div{
      position: relative;
      padding: 0 size(24);
      margin-bottom: size(20);
      &:before{
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: size( 26*1.4 /2 - 4);
        @include circle(8);
        background: #666;
      }
    }
    &:after{
      background-color: #a5a5a5;
    }
  }
  .btns{
    line-height: size(97);
    font-size: size(32);
    background: #f2f2f2;
  }
  .close{
    width: size(28);
    height: size(28);
    @include bg('~img/close.png');
    position: absolute;
    top: size(24);
    right: size(28);
  }
}
</style>