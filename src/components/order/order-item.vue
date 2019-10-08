<template>
  <div class="item">
    <div class="head table border-bottom">
      <div class="time"><div>2019/3/8  17:08:20</div></div>
      <div class="status"><span>已发货</span></div>
    </div>
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
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.item{
  min-height: 150px;
  background: #fff;
  padding-left: size(20);
}
.head{
  height: size(74);
  padding-left: size(10);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .time{
    font-size: size(26);
  }
  .status{
    text-align: right;
    font-size: size(26);
    span{
      padding-right: size(30);
    }
  }
}
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
</style>