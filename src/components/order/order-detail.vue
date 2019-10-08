<template>
  <div class="wrap">
    <div class="big-status table">
      <div class="status">
        <span>代付款</span>
      </div>
      <div class="icon">
        <div class="img-wrap"></div>
      </div>
    </div>
    <div class="con-p">
      <div class="address">
        <div class="table">
          <div class="location-icon">
            <img src="~img/icon/location.png" alt="">
          </div>
          <div>
            <div class="detail">广东省深圳市福田区车公庙泰然11122庙泰然11122庙泰然111122</div>
            <div class="name">李白    13125089651</div>
          </div>
        </div>
      </div>
      <div class="goods">
        <div class="con table border-bottom">
          <div class="goods-pic"><div><img src="" alt=""></div></div>
          <div class="goods-desc">
            <div class="name">3M 燃油宝汽油添加剂加</div>
            <div class="spec">3只装 500ML/瓶</div>
          </div>
          <div class="price-num">
            <div class="price">¥1199.00</div>
            <div class="num">x1</div>
          </div>
        </div>
        <div class="sum">
          <span class="cut">已优惠金额：¥1.00 |</span> 合计：<span class="price">￥1200</span>
        </div>
      </div>
      <div class="order-detail">
        <div class="line">订单来源：&nbsp;&nbsp;李世民</div>
        <div class="line">订单编号：&nbsp;&nbsp;65sf4d56sd4f65d4f56df45f1</div>
        <div class="line">下单时间：&nbsp;&nbsp;李世民</div>
        <div class="line">物流信息：&nbsp;&nbsp;顺丰速运 （545454545）<div class="btn-inline where">查看</div></div>
      </div>
    </div>
    <div class="panel">
      <div class="btn-inline">联系卖家</div>
      <div class="btn-inline warn">确认收货</div>
    </div>
    <!-- 确认收货弹窗 -->
    <join-free ref="joinFree"></join-free>
  </div>
</template>

<script>
import JoinFree from 'base/join-free'
export default {
  components: {
    JoinFree
  },
  mounted() {
    // this.$refs.joinFree.show()
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
}
.big-status{
  background-image: linear-gradient(80deg, #07affe 0%, #12c0ff 100%);
  padding-left: size(40);
  padding-right: size(62);
  height: size(194);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .status{
    font-size: size(36);
    font-weight: 800;
    color: #fff;
  }
  .icon{
    text-align: right;
    .img-wrap{
      display: inline-block;
      width: size(170);
      height: size(170);
    }
    @mixin sbg($name, $png) {
      &.#{$name}{
        .img-wrap{
          @include bg('~img/#{$png}.png');
        }
      }
    }
    @include sbg(x, 'daizhifu');
    @include sbg(x, 'daifahuo');
    @include sbg(x, 'yifahuo');
    @include sbg(x, 'yishouhuo');
  }
  
}
.con-p{
  position: relative;
  padding-bottom: size(110);
}
.address{
  background: #fff;
  padding: size(26) 0;
  .table{
    background: #fff;
    padding: 0 size(30);
    >div{
      display: table-cell;
      vertical-align: top;
    }
  }
  .location-icon{
    width: size(46);
    img{
      width: size(46);
    }
  }
  .name,.detail{
    padding-left: size(16);
  }
  .name{
    font-size: size(24);
    color: #666;
    margin-top: size(20);
  }
  .detail{
    font-size: size(26);
    color: #333;
    line-height: 1.4;
    @include txt-overflow(2);
  }
}
.goods{
  background: #fff;
  padding-left: size(20);
  margin-top: size(20);
  .con{
    padding: size(30) 0;
    padding-right: size(20);
    >div{
      vertical-align: top;
      display: table-cell;
    }
    .goods-pic{
      width: size(120);
      >div{
        width: size(120);
        height: size(120);
        overflow: hidden;
        img{
          display: block;
          width: 100%;
        }
      }
    }
    .goods-desc{
      padding-left: size(20);
      .name{
        font-size: size(26);
        font-weight: 800;
        margin-bottom: size(16);
        line-height: size(40);
        min-height: size(80);
        @include txt-overflow(2);
      }
      .spec{
        font-size: size(24);
        color: #999;
        @include txt-overflow;
      }
    }
    .price-num{
      width: size(80);
      text-align: right;
      font-size: size(24);
      min-width: size(120);
      line-height: size(40);
      .price{
        color: #000;
      }
      .num{
        color: #666;
      }
    }
  }
  .sum{
    font-size: size(24);
    color: #666;
    line-height: size(66);
    text-align: right;
    padding: 0 size(20);
    .price{
      color: #e31436;
    }
    .cut{
      font-size: size(22);
    }
  }
}
.mark{
  >div{
    vertical-align: top;
    display: table-cell;
  }
  font-size: size(24);
  color: #666;
  .name{
    color: #999;
    width: size(104);
  }
  .text{
    line-height: 1.4;
  }
}
.all{
  text-align: right;
  font-size: size(28);
  line-height: size(88);
  span{
    color: $color-main;
  }
}
.order-detail{
  padding: size(4) size(24);
  margin-top: size(20);
  font-size: size(24);
  overflow: hidden;
  color: #333;
  background: #fff;
  .line{
    margin: size(24) 0;
    line-height: 1.2;
  }
  .btn-inline{
    font-size: size(22);
    float:right;
    padding: size(6) size(30);
    position: relative;
    top: size(-6);
    color: #666;
    border-color: #ccc;
    line-height: 1;
  }
  .where{
  }
}
.panel{
  background: #fff;
  position: fixed;
  z-index: 1;
  left:0;
  bottom: 0;
  width: 100%;
  padding: size(28) size(20);
  min-height: size(110);
  .btn-inline{
    padding: size(12) size(20);
    border-color: #bbb;
    float: right;
    margin-left: size(22);
    font-size: size(26);
    &.warn{
      color: #e31436;
      border-color: #e31436;
    }
  }
}
</style>