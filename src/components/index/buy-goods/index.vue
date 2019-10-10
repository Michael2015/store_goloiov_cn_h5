<template>
  <div class="wrap">
    <div class="addr-wrap" @click="goSelectAddr">
      <div class="base">
        <img src="~img/icon/location.png" alt="">
        <span>广东省 深圳市 龙岗区 五和大道</span>
      </div>
      <div class="detail">
        详细地址详细地址详细地址详细地址详细地址
      </div>
      <div class="contact">王先生</div>
      <img src="~img/icon/join-right.png" alt="" class="right">
      <div class="line"><!-- 地址线 --></div>
    </div>
    <div class="goods table">
      <div class="img">
        <img src="" alt="">
      </div>
      <div class="con">
        <div class="name">车联网车载OBD智能盒子GPS…</div>
        <div class="type">黑色</div>
        <div class="price-num">
          <span class="price">￥1000.00</span>
          <span class="num">x1</span>
        </div>
      </div>
    </div>
    <div class="spec">
      <div class="col clearfix">
        <div class="left">商品单价</div>
        <div class="right">¥1199.00</div>
      </div>
      <div class="col clearfix">
        <div class="left">优惠金额</div>
        <div class="right">¥0</div>
      </div>
    </div>
    <div class="remark">
      <text-area class="input" placeholder="留言内容/备注" v-model="remark"></text-area>
    </div>
    <div class="opts table">
      <div class="price">
        <span>实付金额：￥1220.00</span>
      </div>
      <div class="buy">
        <span @click="$refs.selAddr.show()">立即购买</span>
      </div>
    </div>
    <city v-model="addr" ref="selAddr"></city>
  </div>
</template>

<script>
import TextArea from 'base/ui/text-area'
import City from 'com/common/city'
export default {
  components: {
    TextArea,
    City
  },
  data() {
    return {
      remark: '',
      addr: []
    }
  },
  methods: {
    goSelectAddr() {
      this.$router.push({
        path: '/myAddress',
        query: {
          select: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
  position: relative;
}
.addr-wrap{
  background: #fff;
  padding: size(20) size(30) size(20 + 8);
  .base{
    line-height: size(46);
    img{
      float: left;
      width: size(46);
      margin-right: size(12);
    }
    span{
      font-size: size(26);
    }
  }
  .detail{
    font-size: size(36);
    line-height: 1.4;
    word-break: break-all;
    word-wrap: break-word;
    margin: size(9) 0 size(16);
    padding-right: size(50);
  }
  .contact{
    font-size: size(26);
    line-height: 1.4;
  }
  position: relative;
  .right{
    position: absolute;
    right: size(30);
    top: 50%;
    width: 12px;
    margin-top: -8px;
  }
  .line{
    position: absolute;
    width: 100%;
    height: size(8);
    left:0;
    bottom: 0;
    @include bg('~img/icon/addr.png');
  }
}
.goods{
  height: size(204);
  background: #fff;
  margin-top: size(18);
  padding: 0 size(30);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .img{
    width: size(144);
    img{
      display: block;
      width: 100%;
      height: size(144);
    }
  }
  .con{
    padding-left: size(36);
    line-height: 1.4;
  }
  .name{
    font-size: size(26);
    @include txt-overflow;
  }
  .type{
    font-size: size(26);
    color: #999;
    margin-top: 4px;
  }
  .price-num{
    margin-top: size(16);
    .price{
      font-size: size(26);
    }
    .num{
      font-size: size(24);
      float: right;
      margin-right: size(60);
    }
  }
}
.spec{
  margin-top: size(18);
  background: #fff;
  font-size: size(26);
  padding: size(24) size(30);
  line-height: 1.42;
  .col{
    .left{
      float: left;
    }
    .right{
      float: right;
    }
    margin-top: size(20);
    &:first-child{
      margin-top: 0;
    }
  }
}
.remark{
  background: #fff;
  margin-top: size(18);
  padding: size(30);
  >.input{
    padding: size(16) size(20);
  }
}
.opts{
  height: size(100);
  background: #fff;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  font-size: size(30);
  z-index: 1;
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .price{
    color: #e31436;
    font-weight: 800;
  }
  .buy{
    width: size(240);
    background: linear-gradient(135deg, #ff0000, #ff3061);
    color: #fff;
  }
}
</style>