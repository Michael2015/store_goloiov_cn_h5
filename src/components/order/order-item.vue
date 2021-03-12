<template>
  <div class="item">
    <div class="head table border-bottom">
      <div class="time">
        <div>{{ item.add_time }}</div>
      </div>
      <div class="status">
        <span v-if="item.status_of_order === 0">待支付</span>
        <span v-if="item.status_of_order === 1">待发货</span>
        <span v-if="item.status_of_order === 2">退款中</span>
        <span v-if="item.status_of_order === 3">已发货</span>
        <span v-if="item.status_of_order === 4">已退款</span>
        <span v-if="
            item.status_of_order === 5 && (item.status == 2 || item.status == 4)
          ">已收货</span>
        <span v-if="item.status_of_order === 5 && item.status == 3">已评价</span>
      </div>
    </div>
    <router-link class="con table border-bottom"
                 :to="'/order-detail/' + item.order_id">
      <div class="goods-left">1</div>
      <div class="goods right">1</div>
    </router-link>
    <div class="sum">
      <!-- <span class="cut">已优惠金额：¥{{ item.coupon_price }} |</span> -->
      合计：<span class="price">￥{{ item.pay_price }}</span>
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
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.item {
  min-height: 150px;
  background: #fff;
  padding-left: size(20);
}
.head {
  height: size(74);
  padding-left: size(10);
  > div {
    display: table-cell;
    vertical-align: middle;
  }
  .time {
    font-size: size(26);
  }
  .status {
    text-align: right;
    font-size: size(26);
    span {
      padding-right: size(30);
    }
  }
}
.con {
  padding-right: size(20);
  height: size(200);
  display: flex;
  > .goods-left {
    width: 30%;
  }
  > .goods-right {
    width: 70%;
  }
}
.sum {
  font-size: size(24);
  color: #666;
  line-height: size(66);
  text-align: right;
  padding: 0 size(20);
  .price {
    color: #e31436;
  }
  .cut {
    font-size: size(22);
  }
}
</style>
