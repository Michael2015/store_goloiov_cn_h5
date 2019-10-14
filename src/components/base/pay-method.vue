<template>
  <div v-show="isShow">
    <div class="mask" @click="hide"></div>
    <div class="wrap">
      <div class="head">
        <img src="~img/close.png" alt="" class="close" @click="hide">
        <span>确认付款</span>
      </div>
      <div class="price">
        <span class="i">￥</span>
        <span><slot>0.00</slot></span>
      </div>
      <div class="col table border-bottom" @click="active=0">
        <div class="icon">
          <img src="~img/alipay.png" alt="">
        </div>
        <div class="name">
          <div class="">支付宝</div>
        </div>
        <div class="check-icon" :class="{active: active===0}">
          <span></span>
        </div>
      </div>
      <div class="col table border-bottom" @click="active=1">
        <div class="icon">
          <img src="~img/wxpay.png" alt="">
        </div>
        <div class="name">
          <div class="">微信支付</div>
        </div>
        <div class="check-icon" :class="{active: active===1}">
          <span></span>
        </div>
      </div>
      <div class="pay" @click="pay">确认付款</div>
    </div>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
export default {
  mixins: [showHide],
  data() {
    return {
      methods: ['alipay', 'wechat'],
      active: 1,
    }
  },
  methods: {
    pay() {
      if (this.cb) {
        this.cb(this.methods[this.active])
      }
      this.hide()
    },
    show(cb) {
      this.isShow = true
      this.cb = cb || null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 300px;
  background: #fff;
  z-index: 99;
  .head{
    font-size: size(36);
    color: #000;
    text-align: center;
    line-height: size(50);
    padding: size(22) size(30);
    .close{
      float: left;
      width: size(30);
      margin: size(10) 0;
    }
  }
  .price{
    text-align: center;
    font-size: size(70);
    color: #000;
    font-weight: 800;
    line-height: size(100);
    margin-top: size(22);
    margin-bottom: size(60);
    .i{
      font-size: size(50);
    }
  }
  .col{
    height: size(120);
    padding-left: size(38);
    padding-right: size(42);
    >div{
      vertical-align: middle;
      display: table-cell;
    }
    .icon{
      width: size(56);
      img{
        width: 100%;
        height: size(56);
        display: block;
      }
    }
    .name{
      padding-left: size(28);
      font-size: size(30);
    }
    .check-icon{
      text-align: right;
      span{
        display: inline-block;
        width: size(40);
        height: size(40);
        @include bg('~img/icon/check.png');
      }
      &.active{
        span{
          @include bg('~img/icon/checked.png'); 
        }
      }
    }
  }
  .pay{
    line-height: size(100);
    text-align: center;
    color: #fff;
    font-size: size(30);
    margin-top: size(148);
    background-image: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
  }
}
</style>