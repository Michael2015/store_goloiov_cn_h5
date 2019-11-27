<template>
  <div class="wrap">
    <top-head>结算</top-head>
    <div class="addr-wrap" @click="goSelectAddr">
      <template v-if="addr">
        <div class="base">
          <img src="~img/icon/location.png" alt />
          <span>{{addr.province}} {{addr.city}} {{addr.district}}</span>
        </div>
        <div class="detail">{{addr.detail}}</div>
        <div class="contact">{{addr.real_name}} {{addr.phone}}</div>
        <img src="~img/icon/join-right.png" alt class="right" />
        <div class="line">
          <!-- 地址线 -->
        </div>
      </template>
      <template v-else>
        <div class="base">
          <img src="~img/icon/location.png" alt />
          <span>请选择收货地址</span>
        </div>
        <img src="~img/icon/join-right.png" alt class="right" />
      </template>
    </div>
    <div class="goods table">
      <div class="img">
        <img :src="info.image?info.image:info.slider_image&&info.slider_image[0]" alt />
      </div>
      <div class="con">
        <div class="name">{{info.store_name}}</div>
        <div class="type">{{preInfo.attr}}</div>
        <div class="price-num">
          <span class="price">￥{{unitPrice}}</span>
          <span class="num">x{{total_num}}</span>
        </div>
      </div>
    </div>
    <div class="spec">
      <div class="col clearfix">
        <div class="left">商品单价</div>
        <div class="right">¥{{unitPrice}}</div>
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
        <span>实付金额：¥{{pay_price}}</span>
      </div>
      <div class="buy">
        <span @click="doPay">{{this.paying ? '支付中...('+status+')' : '立即购买'}}</span>
      </div>
    </div>
    <pay-method ref="payMethod" :is_jf="is_jf" :now_money="now_money">{{pay_price}}</pay-method>
    <notice ref="notice" :autoClose="false"></notice>
    <confirm ref="leaveConfirm" :autoClose="false">
      <span slot="btn-left">我已支付</span>
      <span slot="btn-right">离开</span>
    </confirm>
  </div>
</template>

<script>
import TextArea from "base/ui/text-area";
import PayMethod from "base/pay-method";
import Notice from "base/notice";
import Confirm from "base/confirm";
import { getPreOrderProductInfo, createOrder, pay, queryOrder } from "api/buy";
import { getAddressList } from "api/me";
import { nativePay } from "api/native";
import { mapState } from "vuex";
import { Toast, Loading } from "lib";
export default {
  components: {
    TextArea,
    PayMethod,
    Notice,
    Confirm
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isReClick: true, // 点击标识
      remark: "",
      addr: null,
      // 接口获取的信息
      preInfo: {},
      // 路由传过来的信息
      // 不同地方跳入，带的信息不同
      info: {
        newbornzone: {}
      },
      // 订单号, 重新支付才会有
      orderId: "",
      // 订单号，不是重新支付，是新创建的订单
      createdOrderId: "",
      // 支付中
      paying: false,
      // status 管理当前页面目前支付进行到哪里了
      // 1 创建订单成功
      // 2 获取支付参数成功
      // 3 app回调支付成功
      // 4 app回调支付失败
      status: 0,
      // 询问用户是否离开
      inConfirmLeave: false,
      now_money: "" //我的积分余额
    };
  },
  created() {
    // this.loaddata()
  },
  beforeRouteLeave(to, from, next) {
    if (this.paying && this.status === 2) {
      // 支付中 并且已经调用app原生支付，但是还没收到app的回调
      if (this.inConfirmLeave) return;
      this.inConfirmLeave = true;
      this.$refs.leaveConfirm.show(
        "订单还在支付中，确定放弃支付吗？",
        () => {
          // 用户点了我已经支付按钮
          this.queryOrder();
          this.inConfirmLeave = false;
          // 取消路由
          next(false);
        },
        () => {
          // 跳原来的路由
          next();
          this.inConfirmLeave = false;
        }
      );
    } else {
      this.$refs.payMethod.hide();
      next();
    }
  },
  activated() {
    // 这里用了上一个页面传进来的数据
    // 判断是否需要刷新页面
    if (this.$route.params.info) {
      this.paying = false;
      this.status = 0;
      this.remark = "";
      this.addr = null;
      this.preInfo = {};
      this.info = this.$route.params.info;
      this.orderId = this.$route.params.orderId || "";
      this.createdOrderId = "";
      this.loaddata();
    }
    if (this.addr && this.addr.id) {
      // 有地址
      // 用户可能先有个地址，让后进入我的地址列表去删除这个地址，这时又返回来
      // 所以重新调用接口校验这个地址是否已经删除
      getAddressList().then(data => {
        if (data) {
          const addr = data.filter(i => i.id === this.addr.id);
          if (addr && addr.length > 0) {
            // 还是有效地址
            // 用最新的数据，用户可能修改过这个地址的内容
            this.addr = addr[0];
          } else {
            // 地址不存在了，删除地址
            this.addr = null;
          }
        }
      });
    }
  },
  methods: {
    loaddata() {
      getPreOrderProductInfo(
        this.id,
        this.orderId,
        this.$route.params.sku_id
      ).then(data => {
        if (data) {
          this.preInfo = data;
          this.now_money = data.now_money;
        }
      });
      if (!this.orderId) {
        getAddressList().then(data => {
          if (data) {
            const defaultAddr = data.filter(i => i.is_default);
            if (defaultAddr.length > 0) {
              this.addr = defaultAddr[0];
            } else if (data.length > 0) {
              this.addr = data[0];
            } else {
              // 没有地址
            }
          }
        });
      } else {
        // 有订单了，重做地址
        const a = this.info.user_address.split(" ");
        const addr = {
          province: a[0],
          city: a[1],
          district: a[2],
          detail: a.slice(3).join(" "),
          real_name: this.info.real_name,
          phone: this.info.user_phone
        };
        this.addr = addr;
        // 重写备注
        this.remark = this.info.mark;
      }
    },
    goSelectAddr() {
      if (this.show_model) {
        return;
      }
      // 清空上次保存的地址
      this.$store.commit("setAddress", null);
      // 选择地址，就刷新地址
      const clear = this.$watch("selectAddress", () => {
        this.addr = this.selectAddress;
        clear();
      });
      this.$router.push({
        path: "/myAddress",
        query: {
          select: 1
        }
      });
    },
    doPay() {
      if (this.paying) {
        return;
      }
      if (!this.addr) {
        Toast("请选择地址");
        return;
      }
      this.$refs.payMethod.show(type => {
        // 去支付
        Loading.open();
        this.paying = true;
        if (this.orderId || this.createdOrderId) {
          // 已经有订单了,或者已经创建过订单了
          this.status = 1;
          // 发起支付
          getNativePayParams(this.orderId || this.createdOrderId, type);
        } else {
          let miandan_type;
          if (this.info.is_platoon == 1 && this.info.is_self_buy_platoon == 1) {
            miandan_type = 1;
          }
          // 创建订单, 避免并发
          if (this.isReClick) {
            getCreateOrder(type, miandan_type);
            this.isReClick = false
          } else {
            Toast('请勿重复提交订单')
            return
          }
          
        }
      });

      // 创建订单
      const getCreateOrder = (type, miandan_type) => {
        createOrder({
          product_id: this.id,
          address_id: this.addr.id,
          mark: this.remark,
          paytype: type,
          miandan_type,
          total_num: this.total_num
        }).then(
          data => {
            this.isReClick = true
            if (data && data.order_id) {
              // 下单成功，触发支付
              this.createdOrderId = data.order_id;
              this.status = 1;
              getNativePayParams(data.order_id, type);
              // 成功下单，这里出发刷新订单列表
              this.$store.commit("refreshOrder");
            } else {
              Loading.close();
              this.paying = false;
              Toast("下单失败,请稍后再试");
            }
          },
          () => {
            // 下单失败
            Loading.close();
            this.isReClick = true
            this.paying = false;
            Toast("下单失败,请稍后再试");
          }
        );
      };

      // 获取支付参数
      const getNativePayParams = (id, type) => {
        pay(id, type)
          .then(
            data => {
              if (data) {
                // 发起积分支付
                if (type == "yue") {
                  this.queryOrder("y");
                  return;
                }
                // 支付参数获取成功
                this.status = 2;
                nativePay(type, data).then(result => {
                  if (result == 0) {
                    // app 捕获到支付成功
                    this.status = 3;
                    this.queryOrder();
                  } else {
                    this.status = 4;
                    this.$refs.notice.show("支付失败", () => {
                      this.paying = false;
                      if (this.orderId) {
                        // 从订单详情进来的，也就是发起的重新支付
                        // 这里直接跳回原来的的页面
                        this.$router.back();
                      } else {
                        // 是从商品详情页来的，发起的是一笔新的订单
                        // 那就调整订单详情页面
                        this.$router.replace("/order-detail/" + id);
                      }
                    });
                  }
                });
              } else {
                Toast("获取支付参数失败,请稍后再试");
                this.paying = false;
              }
            },
            () => {
              Toast("获取支付参数失败,请稍后再试");
              this.paying = false;
            }
          )
          .finally(() => {
            Loading.close();
          });
      };
    },
    queryOrder(t) {
      const id = this.orderId || this.createdOrderId;
      queryOrder(id).then(
        data => {
          if (data) {
            // 支付成功
            if (t) {
              this.$store.commit("testingMoney", false);
            }
            this.$router.replace({
              path: "/buy-success",
              query: {
                total_price: data.total_price,
                is_platoon: data.is_platoon,
                platoon_number: data.platoon_number,
                position: data.position
              }
            });
          } else {
            this.$refs.notice.show("查询支付失败，请联系客服处理");
            Loading.close();
          }
        },
        msg => {
          this.$refs.notice.show(msg || "查询支付失败，请联系客服处理");
          Loading.close();
        }
      );
    }
  },
  computed: {
    ...mapState(["selectAddress", "buyTotalNum", "is_testing_money"]),
    //true为从现有的订单进入支付页,flase为商品详情进入
    show_model() {
      return !!this.$route.params.orderId;
    },
    //不同进入情况取的单价
    unitPrice() {
      return this.show_model
        ? this.preInfo.price
        : this.info.newbornzone && this.info.newbornzone.is_newborn
        ? this.info.newbornzone.price
        : this.preInfo.price;
    },
    //不同进入情况取的个数
    total_num() {
      let num = this.show_model
        ? this.info.total_num
        : this.$route.params.total_num;
      return num ? num : this.buyTotalNum;
    },
    //不同进入情况取的总价
    pay_price() {
      return this.show_model
        ? this.info.pay_price
        : parseFloat(this.unitPrice * this.total_num).toFixed(2);
    },
    //是否满足积分支付
    is_jf() {
      return parseFloat(this.pay_price) > parseFloat(this.now_money)
        ? true
        : false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
  position: relative;
}
.addr-wrap {
  background: #fff;
  padding: size(20) size(30) size(20 + 8);
  // min-height: size(208);
  .base {
    line-height: size(46);
    img {
      float: left;
      width: size(46);
      margin-right: size(12);
    }
    span {
      font-size: size(26);
    }
  }
  .detail {
    font-size: size(24);
    color: #888;
    line-height: 1.4;
    word-break: break-all;
    word-wrap: break-word;
    margin: size(9) 0 size(16);
    padding-right: size(50);
  }
  .contact {
    font-size: size(26);
    line-height: 1.4;
  }
  position: relative;
  .right {
    position: absolute;
    right: size(30);
    top: 50%;
    width: 12px;
    margin-top: -8px;
  }
  .line {
    position: absolute;
    width: 100%;
    height: size(8);
    left: 0;
    bottom: 0;
    @include bg("~img/icon/addr.png");
  }
}
.goods {
  height: size(204);
  background: #fff;
  margin-top: size(18);
  padding: 0 size(30);
  > div {
    display: table-cell;
    vertical-align: middle;
  }
  .img {
    width: size(144);
    img {
      display: block;
      width: 100%;
      height: size(144);
    }
  }
  .con {
    padding-left: size(36);
    line-height: 1.4;
  }
  .name {
    font-size: size(26);
    @include txt-overflow;
  }
  .type {
    font-size: size(26);
    color: #999;
    margin-top: 4px;
  }
  .price-num {
    margin-top: size(16);
    .price {
      font-size: size(26);
    }
    .num {
      font-size: size(24);
      float: right;
      margin-right: size(60);
      margin-top: size(10);
    }
  }
}
.spec {
  margin-top: size(18);
  background: #fff;
  font-size: size(26);
  padding: size(24) size(30);
  line-height: 1.42;
  .col {
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    margin-top: size(20);
    &:first-child {
      margin-top: 0;
    }
  }
}
.remark {
  background: #fff;
  margin-top: size(18);
  padding: size(30);
  > .input {
    padding: size(16) size(20);
  }
}
.opts {
  height: size(100);
  background: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  font-size: size(30);
  z-index: 1;
  > div {
    display: table-cell;
    vertical-align: middle;
  }
  .price {
    color: #e31436;
    font-weight: 800;
  }
  .buy {
    width: size(240);
    background: linear-gradient(135deg, #ff0000, #ff3061);
    color: #fff;
  }
}
</style>