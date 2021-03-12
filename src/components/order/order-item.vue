<template>
  <div class="item">
    <!-- <div class="head table border-bottom">
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
    </div> -->
    <router-link class="con table border-bottom"
                 :to="'/order-detail/' + item.order_id">
      <div class="goods-left">
        <div class="top">￥<span>{{item.coupon_price}}</span></div>
        <div class="bottom">可兑换{{item.total_num}}瓶饮料</div>
      </div>
      <div class="goods-right">
        <div class="top"><span>{{item.coupon_price}}</span>元提货券</div>
        <div class="bottom">{{formatDate(item.starttime)}}-{{formatDate(item.endtime)}}</div>
        <div class="btn"
             :class='Number(item.status)===3?"gray":"red"'>{{formatUse(item.status)}}</div>
      </div>
    </router-link>
    <!-- <div class="sum">
      <span class="cut">已优惠金额：¥{{ item.coupon_price }} |</span> 
      合计：<span class="price">￥{{ item.pay_price }}</span>
    </div> -->
  </div>
</template>

<script>
import { formatDate } from 'lib/index'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formatUse() {
      return n => {
        switch (Number(n)) {
          case 1: return '立即使用'
          case 2: return '查看物流'
          case 3: return '已过期'
        }
      }
    },
    formatDate() {
      return n => {
        return formatDate(n * 1000, 'YYYY.MM.DD')
      }

    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.item {
  /* min-height: 150px; */
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
    width: 40%;
    background: #75a5e7;
    text-align: center;
    .top {
      font-size: size(40);
      color: white;
      margin: size(40) 0 size(20);
      > span {
        font-size: size(60);
      }
    }
    .bottom {
      font-size: size(28);
      color: white;
    }
  }
  > .goods-right {
    width: 60%;
    padding: size(30) size(20);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    > .top {
      font-size: size(30);
      color: #333;

      > span {
        font-size: size(32);
      }
    }
    > .bottom {
      font-size: size(28);
      color: #333;
    }
    > .btn {
      background: white;

      border-radius: size(50);
      height: size(60);
      position: absolute;
      line-height: size(20);
      padding: size(20) size(30);
      box-sizing: border-box;
      font-size: size(28);
      top: 50%;
      right: 0;
      transform: translate(0, -55%);
    }
    > .red {
      border: 1px solid #d7001a;
      color: #d7001a;
    }
    > .gray {
      border: 1px solid #ccc;
      background: #ccc;
      color: black;
    }
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
