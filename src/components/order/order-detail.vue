<template>
  <div class="w">
    <div class="big-status">已收货</div>
    <div class="wrap">
      <div class="con">
        <div class="address">
          <div class="table">
            <div class="location-icon">
              <img src="~img/location.png" alt="">
            </div>
            <div>
              <div class="name">收货人： 李白    13125089651</div>
              <div class="detail">广东省深圳市福田区车公庙泰然11122庙泰然11122庙泰然111122</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <div class="table border-bottom">
            <div class="goods-pic"><div><img src="" alt=""></div></div>
            <div class="goods-desc">
              <div class="name">3M 燃油宝汽油添加剂加</div>
              <div class="spec">3只装 500ML/瓶</div>
            </div>
            <div class="price-num">
              <div class="price">￥233.00</div>
              <div class="num">x1</div>
            </div>
          </div>
          <div class="mark border-bottom table">
            <div class="name"><span>备注</span></div>
            <div class="text">
              <div>东西挺好的 我就买了点东西挺好的 我就买了点东西挺好的 我就买了点东西挺好的 我就买了点东西挺好的 我就买了点东西</div>
            </div>
          </div>
          <div class="all">合计：<span>￥1200</span> 元</div>
        </div>
      </div>
      <div class="order-detail">
        <div class="title">订单详情</div>
        <div class="line">订单来源：&nbsp;&nbsp;&nbsp;&nbsp;李世民</div>
        <div class="line">订单编号：&nbsp;&nbsp;&nbsp;&nbsp;65sf4d56sd4f65d4f56df45f1</div>
        <div class="line">下单时间：&nbsp;&nbsp;&nbsp;&nbsp;李世民</div>
        <div class="line">物流信息：&nbsp;&nbsp;&nbsp;&nbsp;顺丰速运 （545454545）<div class="btn-inline where">查看物流</div></div>
        <div class="line">订单状态：&nbsp;&nbsp;&nbsp;&nbsp;李世民</div>
      </div>
      <div class="panel">
        <div class="btn-inline">联系卖家</div>
        <div class="btn-inline">确认收货</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.big-status{
  background-color: $color-body-bg;
  padding: size(22) size(24) 0;
  font-size: size(36);
  font-weight: 800;
}
.w{
  min-height: 100vh;
  background-color: $color-body-bg;
}
.wrap{
  padding: size(110) 0 size(100);
}
.con{
  background: #fff;
  padding: size(92) size(24) 0;
  position: relative;
  margin-bottom: size(25);
}
.address{
  position: absolute;
  left:0;
  top: size(-85);
  padding: 0 size(24);
  width: 100%;
  .table{
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, .04);
    border-radius: 4px;
    height: size(176);
    background: #fff;
    padding: 0 size(20);
    >div{
      display: table-cell;
      vertical-align: middle;
    }
  }
  .location-icon{
    width: size(86);
    img{
      width: size(28);
    }
  }
  .name{
    font-size: size(28);
    @include txt-overflow;
    margin-bottom: size(22);
  }
  .detail{
    font-size: size(24);
    color: #999;
    line-height: 1.4;
    @include txt-overflow(2);
  }
}
.goods{
  padding: 0 size(20);
  .table{
    padding: size(30) 0;
    >div{
      vertical-align: top;
      display: table-cell;
    }
  }
  .goods-pic{
    width: size(120);
    >div{
      width: size(120);
      height: size(120);
      overflow: hidden;
      background: gold;
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .goods-desc{
    padding-left: size(26);
    .name{
      font-size: size(28);
      font-weight: 800;
      margin-bottom: size(20);
      @include txt-overflow;
    }
    .spec{
      font-size: size(24);
      color: #999;
      line-height: 1.4;
      @include txt-overflow(2);
    }
  }
  .price-num{
    width: size(180);
    text-align: right;
    color: $color-main;
    font-size: size(24);
    .num{
      color: #666;
      margin-top: size(30);
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
  padding: 0 size(24);
  margin-bottom: size(25);
  font-size: size(28);
  overflow: hidden;
  color: #666;
  background: #fff;
  .title{
    color: #333;
    font-weight: 800;
    margin: size(22) 0 size(40);
  }
  .line{
    margin: size(37) 0;
    line-height: 1.2;
  }
  .where{
    font-size: size(20);
    float:right;
    padding: size(12) size(16);
    position: relative;
    top: size(-12);
  }
}
.panel{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  position: fixed;
  z-index: 1;
  left:0;
  bottom: 0;
  width: 100%;
  padding: 0 size(24);
  height: size(96);
  .btn-inline{
    padding: size(16) size(24);
    border-color: #bbb;
  }
}
</style>