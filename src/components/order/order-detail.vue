<template>
  <div class="wrap">
    <top-head>订单详情</top-head>
    <div class="big-status table">
      <div class="status">
        <span v-if="orderInfo.status_of_order === 0">待支付</span>
        <span v-if="orderInfo.status_of_order === 1">待发货</span>
        <span v-if="orderInfo.status_of_order === 2">退款中</span>
        <span v-if="orderInfo.status_of_order === 3">已发货</span>
        <span v-if="orderInfo.status_of_order === 4">已退款</span>
        <span v-if="
            orderInfo.status_of_order === 5 &&
              (orderInfo.status == 2 || orderInfo.status == 4)
          ">已收货</span>
        <span v-if="orderInfo.status_of_order === 5 && orderInfo.status == 3">已评价</span>
      </div>
      <div class="icon"
           :class="{
          daizhifu: orderInfo.status_of_order === 0,
          daifahuo: orderInfo.status_of_order === 1,
          yifahuo: orderInfo.status_of_order === 3,
          yishouhuo:
            orderInfo.status_of_order === 5 &&
            (orderInfo.status == 2 || orderInfo.status == 4)
        }">
        <div class="img-wrap"></div>
      </div>
    </div>
    <div class="con-p">
      <div class="address">
        <div class="table">
          <div class="location-icon">
            <img src="~img/icon/location.png"
                 alt="" />
          </div>
          <div>
            <div class="detail">{{ orderInfo.user_address }}</div>
            <div class="name">
              {{ orderInfo.real_name }} {{ orderInfo.user_phone }}
            </div>
          </div>
        </div>
      </div>
      <div class="goods">
        <div class="con table border-bottom">
          <div class="goods-pic">
            <div><img :src="orderInfo.image"
                   alt="" /></div>
          </div>
          <div class="goods-desc">
            <div class="name">{{ orderInfo.store_name }}</div>
            <div class="spec">{{ "暂无规格" || orderInfo.suk }}</div>
          </div>
          <div class="price-num">
            <div class="price">¥{{ orderInfo.per_price }}</div>
            <div class="num">x{{ orderInfo.total_num }}</div>
          </div>
        </div>
        <div class="sum">
          <!--  <span class="cut">优惠:¥{{ orderInfo.coupon_price }} |</span>
          <span class="cut"> 积分:{{ orderInfo.used_golo_points }} | </span> -->
          合计:<span class="price">￥{{ orderInfo.pay_price }}</span>
        </div>
      </div>
      <div class="order-detail">
        <div class="line">订单来源：&nbsp;&nbsp;{{ orderInfo.nickname }}</div>
        <div class="line">
          订单编号：&nbsp;&nbsp;{{ orderInfo.order_id }}
          <div class="btn-inline"
               @click="copy">复制</div>
        </div>
        <div class="line">下单时间：&nbsp;&nbsp;{{ orderInfo.add_time }}</div>
        <div class="line">
          物流信息：&nbsp;&nbsp;
          <!--
          -->{{
            orderInfo.delivery_id
              ? orderInfo.delivery_name + " (" + orderInfo.delivery_id + ")"
              : "暂无物流信息"
          }}
          <div class="btn-inline where"
               v-if="orderInfo.delivery_id"
               @click="goTrack">
            查看
          </div>
        </div>
        <div class="line">支付方式：&nbsp;&nbsp;{{ orderInfo.pay_type }}</div>
        <div class="line"
             v-if="orderInfo.status_of_order === 4">
          退款时间：&nbsp;&nbsp;{{ orderInfo.refund_reason_time }}
        </div>
        <div class="line">获得积分：&nbsp;&nbsp;20</div>
        <div class="line">股东排名：&nbsp;&nbsp;20名</div>
      </div>
    </div>
    <div class="panel"
         v-if="orderInfo.is_allow_operation == 1">
      <div class="btn-inline"
           @click="contact"
           v-if="partnerInfo.phone">
        联系卖家
      </div>
      <div class="btn-inline"
           v-if="orderInfo.status_of_order === 0"
           @click="delOrder">
        删除订单
      </div>
      <!-- <div
        class="btn-inline warn"
        v-if="orderInfo.status_of_order === 0"
        @click="goPay"
      >
        重新支付
      </div> -->
      <div class="btn-inline warn"
           v-if="orderInfo.status_of_order === 1"
           @click="fastRefund">
        申请退款
      </div>
      <div class="btn-inline warn"
           v-if="orderInfo.status_of_order === 3"
           @click="confirmOrder">
        确认收货
      </div>
      <div class="btn-inline"
           v-if="
          (orderInfo.status_of_order === 5 &&
            orderInfo.is_allow_refund !== 0) ||
            orderInfo.status_of_order === 3
        "
           @click="goRefund">
        申请退货
      </div>
      <div class="btn-inline"
           v-if="orderInfo.status_of_order === 5 && orderInfo.status !== 3"
           @click="goRemark">
        去评价
      </div>
    </div>
    <!-- 卖家信息 -->
    <contact ref="contact"
             :data="partnerInfo"></contact>
    <!-- 确认收货弹窗 -->
    <join-free ref="joinFree"></join-free>
    <confirm ref="confirm"></confirm>
    <notice ref="notice"></notice>
  </div>
</template>

<script>
import JoinFree from "base/join-free";
import Confirm from "base/confirm";
import Contact from "base/contact";
import Notice from "base/notice";
import {
  getOrderDetail,
  confirmOrder,
  delOrder,
  fastOrderRefund
} from "api/order";
import { Loading, setClipboard, Toast } from "lib";
export default {
  components: {
    JoinFree,
    Confirm,
    Contact,
    Notice
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      orderInfo: {},
      // 卖家信息
      partnerInfo: {}
    };
  },
  created() {
    this.loaddata();
  },
  mounted() {
    // this.$refs.joinFree.show()
  },
  methods: {
    loaddata() {
      // 加载订单数据
      Loading.open();
      getOrderDetail(this.id)
        .then(
          data => {
            if (data) {
              console.log(data);
              this.orderInfo = data;
              try {
                if (data.partner_info) {
                  const partnerInfo = JSON.parse(data.partner_info);
                  if (partnerInfo) {
                    this.partnerInfo = partnerInfo;
                  }
                }
              } catch (e) {
                console.log(e);
              }
            } else {
              this.$refs.notice.show("未查询到订单信息", () => {
                this.$router.back();
              });
            }
          },
          () => {
            this.$refs.notice.show("未查询到订单信息", () => {
              this.$router.back();
            });
          }
        )
        .finally(() => {
          Loading.close();
        });
    },
    confirmOrder() {
      // 确认收货逻辑
      const cb = type => {
        // type 1 一般收货
        // type 2 排队免单
        Loading.open();
        confirmOrder(type, this.orderInfo.id, this.id).then(data => {
          Loading.close();
          if (data) {
            this.$refs.notice.show("收货成功", () => {
              this.loaddata();
            });
          }
        });
      };
      if (this.orderInfo.is_platoon == 1) {
        // 参加公排
        this.$refs.joinFree.show(
          () => {
            // 排队免单
            cb(2);
          },
          () => {
            // 一般收货
            cb(1);
          }
        );
      } else {
        this.$refs.confirm.show("您确定已收到货吗?", () => {
          cb(1);
        });
      }
    },
    delOrder() {
      this.$refs.confirm.show("确定删除此订单吗?", () => {
        Loading.open();
        delOrder(this.id).then(data => {
          Loading.close();
          if (data) {
            this.$refs.notice.show("删除成功", () => {
              this.$store.commit("refreshOrder");
              this.$router.back();
            });
          }
        });
      });
    },
    goPay() {
      // 去支付
      // 跳入购买页面 传入商品id
      //  console.log(this.orderInfo);
      this.$router.push({
        name: "buy-goods",
        params: {
          id: this.orderInfo.product_id + "",
          orderId: this.id,
          info: this.orderInfo,
          unique: this.orderInfo.unique,
          hiddenDiscount: true
        }
      });
    },
    fastRefund() {
      // 快速退款
      this.$refs.confirm.show("确定退款吗?", () => {
        Loading.open();
        fastOrderRefund(this.id).then(
          data => {
            Loading.close();
            if (data) {
              this.$refs.notice.show("退款成功", () => {
                this.loaddata();
                this.$store.commit("refreshOrder");
              });
            }
          },
          msg => {
            this.$refs.notice.show(msg || "退款失败，请联系客服处理");
            Loading.close();
          }
        );
      });
    },
    contact() {
      this.$refs.contact.show();
    },
    goRemark() {
      // 去评价
      this.$router.push("/order-remark/" + this.id);
    },
    goRefund() {
      // 去退货
      this.$router.push("/order-refund/" + this.id);
    },
    goTrack() {
      // 查看订单物流信息
      this.$router.push({
        path: "/order-track",
        query: {
          id: this.orderInfo.delivery_id,
          name: this.orderInfo.delivery_name
        }
      });
    },
    copy() {
      const NEXT = "\r\n";
      const orderInfo = this.orderInfo;
      let info =
        orderInfo.store_name +
        NEXT +
        "订单号：" +
        orderInfo.order_id +
        NEXT +
        "物流单号：" +
        (orderInfo.delivery_id
          ? orderInfo.delivery_name + "(" + orderInfo.delivery_id + ")"
          : "空") +
        NEXT +
        "-----------" +
        NEXT +
        orderInfo.real_name +
        " " +
        orderInfo.user_phone +
        NEXT +
        orderInfo.user_address +
        NEXT +
        "-----------" +
        NEXT;
      setClipboard(info).then(() => {
        Toast("复制成功");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
}
.big-status {
  background-image: linear-gradient(80deg, #07affe 0%, #12c0ff 100%);
  padding-left: size(40);
  padding-right: size(62);
  height: size(194);
  > div {
    display: table-cell;
    vertical-align: middle;
  }
  .status {
    font-size: size(36);
    font-weight: 800;
    color: #fff;
  }
  .icon {
    text-align: right;
    .img-wrap {
      display: inline-block;
      width: size(170);
      height: size(170);
    }
    @mixin sbg($name, $png) {
      &.#{$name} {
        .img-wrap {
          @include bg("~img/#{$png}.png");
        }
      }
    }
    @include sbg("daizhifu", "daizhifu");
    @include sbg("daifahuo", "daifahuo");
    @include sbg("yifahuo", "yifahuo");
    @include sbg("yishouhuo", "yishouhuo");
  }
}
.con-p {
  position: relative;
  padding-bottom: size(110);
}
.address {
  background: #fff;
  padding: size(26) 0;
  .table {
    background: #fff;
    padding: 0 size(30);
    > div {
      display: table-cell;
      vertical-align: top;
    }
  }
  .location-icon {
    width: size(46);
    img {
      width: size(46);
    }
  }
  .name,
  .detail {
    padding-left: size(16);
  }
  .name {
    font-size: size(24);
    color: #666;
    margin-top: size(20);
  }
  .detail {
    font-size: size(26);
    color: #333;
    line-height: 1.4;
    @include txt-overflow(2);
  }
}
.goods {
  background: #fff;
  padding-left: size(20);
  margin-top: size(20);
  .con {
    padding: size(30) 0;
    padding-right: size(20);
    > div {
      vertical-align: top;
      display: table-cell;
    }
    .goods-pic {
      width: size(120);
      > div {
        width: size(120);
        height: size(120);
        overflow: hidden;
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .goods-desc {
      padding-left: size(20);
      .name {
        font-size: size(26);
        font-weight: 800;
        margin-bottom: size(16);
        line-height: size(40);
        min-height: size(80);
        @include txt-overflow(2);
      }
      .spec {
        font-size: size(24);
        color: #999;
        @include txt-overflow;
      }
    }
    .price-num {
      width: size(80);
      text-align: right;
      font-size: size(24);
      min-width: size(120);
      line-height: size(40);
      .price {
        color: #000;
      }
      .num {
        color: #666;
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
}
.mark {
  > div {
    vertical-align: top;
    display: table-cell;
  }
  font-size: size(24);
  color: #666;
  .name {
    color: #999;
    width: size(104);
  }
  .text {
    line-height: 1.4;
  }
}
.all {
  text-align: right;
  font-size: size(28);
  line-height: size(88);
  span {
    color: $color-main;
  }
}
.order-detail {
  padding: size(4) size(24);
  margin-top: size(20);
  font-size: size(24);
  overflow: hidden;
  color: #333;
  background: #fff;
  .line {
    margin: size(24) 0;
    line-height: 1.2;
  }
  .btn-inline {
    font-size: size(22);
    float: right;
    padding: size(6) size(30);
    position: relative;
    top: size(-6);
    color: #666;
    border-color: #ccc;
    line-height: 1;
  }
  .where {
  }
}
.panel {
  background: #fff;
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: size(28) size(20);
  min-height: size(110);
  text-align: right;
  .btn-inline {
    padding: size(12) size(20);
    border-color: #bbb;
    // float: right;
    margin-left: size(22);
    font-size: size(26);
    &.warn {
      color: #e31436;
      border-color: #e31436;
    }
  }
}
</style>
