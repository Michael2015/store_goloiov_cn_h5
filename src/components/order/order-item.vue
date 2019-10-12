<template>
  <div class="item">
    <div class="head table border-bottom">
      <div class="time"><div>{{item.add_time}}</div></div>
      <div class="status">
        <span v-if="item.status_of_order === 0">待支付</span>
        <span v-if="item.status_of_order === 1">待发货</span>
        <span v-if="item.status_of_order === 2">退款中</span>
        <span v-if="item.status_of_order === 3">已发货</span>
        <span v-if="item.status_of_order === 4">已退款</span>
        <span v-if="item.status_of_order === 5 && (item.status == 2 || item.status == 4)">已收货</span>
        <span v-if="item.status_of_order === 5 && item.status == 3">已评价</span>
      </div>
    </div>
    <router-link class="con table border-bottom" :to="'/order-detail/'+item.order_id">
      <div class="goods-pic"><div><img v-lazy="item.image" alt=""></div></div>
      <div class="goods-desc">
        <div class="name">{{item.store_name}}</div>
        <div class="spec">{{item.suk}}</div>
      </div>
      <div class="price-num">
        <div class="price">¥{{item.price}}</div>
        <div class="num">x{{item.total_num}}</div>
      </div>
    </router-link >
    <div class="sum">
      <span class="cut">已优惠金额：¥{{item.coupon_price}} |</span> 合计：<span class="price">￥{{item.pay_price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
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
    color: #333;
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