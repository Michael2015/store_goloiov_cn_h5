<template>
  <div class="warp">
    <top-head>免单奖励详情</top-head>
    <div class="award">免单奖励{{showObj.income_number}}元</div>
    <div class="user_msg">
      <img src="~img/location-red.png" alt />
      <div class="msg">
        <div class="address">{{showObj.user_address}}</div>
        <div class="name_phone">
          <div class="name">{{showObj.real_name}}</div>
          <div class="phone" v-if="showObj.user_phone">{{phonehide(showObj.user_phone)}}</div>
        </div>
      </div>
    </div>
    <div class="simpleness_show">
      <div class="left">订单号: {{showObj.order_id}}</div>
      <div class="right">
        <span v-if="showObj.status_of_order === 0">待支付</span>
        <span v-if="showObj.status_of_order === 1">待发货</span>
        <span v-if="showObj.status_of_order === 2">退款中</span>
        <span v-if="showObj.status_of_order === 3">已发货</span>
        <span v-if="showObj.status_of_order === 4">已退款</span>
        <span v-if="showObj.status_of_order === 5 && (showObj.status == 2 || showObj.status == 4)">已收货</span>
        <span v-if="showObj.status_of_order === 5 && showObj.status == 3">已评价</span>
      </div>
    </div>
    <div class="simpleness_show">
      <div class="left">结算状态: {{showObj.settle_time}}</div>
      <div class="right">{{showObj.income_status}}</div>
    </div>
    <div class="simpleness_show">
      <div class="left">免单方式: {{showObj.miandan_type}}</div>
      <div class="right"></div>
    </div>
    <div class="about_order">
      <div class="title">关联订单:</div>
      <div class="order_list">
        <div class="item" v-for="(item,index) in showObj.related_user" :key="index">
          <img :src="item.avatar" alt />
          <div class="order_msg">
            <div class="about_name">{{item.nickname}}</div>
            <div class="order_no">{{item.uid}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good_show">
      <img :src="showObj.image" alt />
      <div class="good_msg">
        <div class="main_show">
          <div class="desc">
            <div class="good_name">{{showObj.store_name}}</div>
            <div class="color">{{showObj.suk}}</div>
          </div>
          <div class="about_money">
            <div class="money">¥{{showObj.pay_price}}</div>
            <div class="count">×{{showObj.total_num}}</div>
          </div>
        </div>
        <div class="allmoney">
          <span>已优惠金额：￥{{showObj.coupon_price}}</span>
          <span></span>
          <span>
            合计：
            <span>￥{{showObj.pay_price}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="exey_show_list">
      <div class="exey_show">
        <div class="left">订单来源</div>
        <div class="right">{{showObj.nickname}}</div>
      </div>
      <div class="exey_show">
        <div class="left">购买人</div>
        <div class="right">{{showObj.nickname}}</div>
      </div>
      <div class="exey_show">
        <div class="left">下单时间</div>
        <div class="right">{{showObj.add_time}}</div>
      </div>
      <div class="exey_show">
        <div class="left">物流信息</div>
        <div class="right">{{showObj.delivery_id ? showObj.delivery_name + ' ('+ showObj.delivery_id +')' : '暂无物流信息' }}</div>
      </div>
      <!-- <div class="exey_show">
        <div class="left">赠送产品</div>
        <div class="right">XXXXXXXXXXX</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import loadShowobj from 'mixins/loadShowobj'
export default {
  mixins:[loadShowobj],
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  font-size: size(24);
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .award {
    color: #fff;
    font-size: size(34);
    height: size(163);
    line-height: size(163);
    background: linear-gradient(90deg, #f45445 0%, #e62a21 100%);
    padding: 0 size(40);
    font-family: PingFangSC-Medium;
  }
  .user_msg {
    display: flex;
    padding: size(26) size(30) size(30) size(30);
    background: #ffffff;
    & > img {
      width: size(46);
      height: size(46);
      margin-right: size(16);
    }
    .msg {
      flex: 1;
      .address {
        color: #333333;
        font-size: size(26);
        height: size(37);
        line-height: size(37);
        margin-top: size(4);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
      }
      .name_phone {
        margin-top: size(20);
        display: flex;
        color: #666666;
        font-size: size(24);
        .name {
          margin-right: size(35);
        }
        .phone {
          flex: 1;
          color: #999999;
        }
      }
    }
  }
  .simpleness_show {
    margin-top: size(2);
    font-size: size(28);
    color: #9e9e9e;
    height: size(100);
    line-height: size(100);
    padding: 0 size(30);
    display: flex;
    background: #fff;
    &:nth-child(1) {
      margin-top: size(20);
    }
    .right {
      color: #333333;
      flex: 1;
      text-align: right;
    }
  }
  .about_order {
    margin-top: size(2);
    background: #ffffff;
    padding: size(22) size(30);
    .title {
      color: #333;
      font-size: size(28);
    }
    .order_list {
      display: flex;
      flex-wrap: wrap;
      .item {
        min-width: 33.33%;
        display: flex;
        margin-top: size(22);
        & > img {
          width: size(68);
          height: size(68);
          border-radius: 50%;
          margin-right: size(12);
        }
        .order_msg {
          flex: 1;
          .about_name {
            height: size(37);
            line-height: size(37);
            color: #333;
            font-size: size(26);
            width: size(144);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .order_no {
            height:size(30);
            line-height: size(30);
            font-size: size(22);
            color: #999;
            width: size(144);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .good_show {
    margin-top: size(20);
    background: #ffffff;
    padding: size(25) size(20) size(20) size(20);
    display: flex;
    & > img {
      width: size(138);
      height: size(138);
      margin-right: size(11);
    }
    .good_msg {
      flex: 1;
      .main_show {
        display: flex;
        border-bottom: size(1) solid #f2f2f2;
        padding-bottom: size(28);
        .desc {
          width: size(432);
          font-size: size(26);
          color: #333333;
          .color {
            color: #999999;
            font-size: size(24);
            margin-top: size(16);
          }
        }
        .about_money {
          flex: 1;
          font-size: size(24);
          text-align: right;
          .money {
            color: #000;
          }
          .count {
            color: #666666;
          }
        }
      }
      .allmoney {
        text-align: right;
        height: size(66);
        line-height: size(66);
        & > span {
          &:nth-child(1) {
            color: #333333;
            font-size: size(22);
            margin-right: size(20);
          }
          &:nth-child(2) {
            display: inline-block;
            width: size(2);
            height: size(23);
            background: #cfcfcf;
            color: #cfcfcf;
          }
          &:nth-child(3) {
            font-size: size(24);
            color: #333333;
            margin-left: size(20);
            & > span {
              font-size: size(24);
              color: #e31436;
            }
          }
        }
      }
    }
  }
  .exey_show_list {
    padding: size(40) size(30);
    background: #fff;
    margin-top: size(20);
    .exey_show {
      margin-top: size(30);
      height: size(40);
      line-height: size(40);
      display: flex;
      justify-content: space-between;
      font-size: size(28);
      &:nth-child(1) {
        margin-top: 0;
      }
      .left {
        color: #9e9e9e;
      }
      .right {
        color: #333;
      }
    }
  }
}
</style>