<template>
  <div class="wrap">
    <top-head>结算</top-head>
    <div class="addr-wrap"
         @click="goSelectAddr">
      <template v-if="addr">
        <div class="base">
          <img src="~img/icon/location.png"
               alt />
          <span>{{ addr.province }} {{ addr.city }} {{ addr.district }}</span>
        </div>
        <div class="detail">{{ addr.detail }}</div>
        <div class="contact">{{ addr.real_name }} {{ addr.phone }}</div>
        <img src="~img/icon/join-right.png"
             alt
             class="right" />
        <div class="line">
          <!-- 地址线 -->
        </div>
      </template>
      <template v-else>
        <div class="base">
          <img src="~img/icon/location.png"
               alt />
          <span>请选择收货地址</span>
        </div>
        <img src="~img/icon/join-right.png"
             alt
             class="right" />
      </template>
    </div>
    <div class="goods table">
      <div class="img">
        <img :src="
            info.image ? info.image : info.slider_image && info.slider_image[0]
          "
             alt />
      </div>
      <div class="con">
        <div class="name">{{ info.store_info }}</div>
        <div class="price-num">
          <span class="price">¥{{ remainPoint(unitPrice||0,2) }}</span>
          <div class="setcount">
            <div class="reduce"
                 @click="reduce">-</div>
            <input class="count"
                   type="number"
                   v-model="total_num" />
            <div class="add"
                 @click="add">+</div>
          </div>
        </div>
      </div>
    </div>
    <div class="spec">
      <div class="co clearfix">
        <div class="left">商品单价</div>
        <div class="right">¥{{ remainPoint(unitPrice||0,2) }}</div>
      </div>
      <div class="co clearfix">
        <div class="left">优惠金额</div>
        <div class="right">¥{{ comDiscount }}</div>
      </div>
      <div class="co clearfix">
        <div class="left">实付金额</div>
        <div class="right">¥{{ discountPrice }}</div>
      </div>
    </div>
    <div class="col table border-bottom payType"
         @click="active = 0">
      <div class="icon">
        <img src="~img/alipay.png"
             alt="" />
      </div>
      <div class="name">
        <div class="">支付宝</div>
      </div>
      <div class="check-icon"
           :class="{ active: active === 0 }">
        <span></span>
      </div>
    </div>
    <div class="col table border-bottom"
         @click="active = 1">
      <div class="icon">
        <img src="~img/wxpay.png"
             alt="" />
      </div>
      <div class="name">
        <div class="">微信支付</div>
      </div>
      <div class="check-icon"
           :class="{ active: active === 1 }">
        <span></span>
      </div>
    </div>
    <div class="tip">
      <div class="title">提货券价格变化说明</div>
      <div class="content">价格波动算法：以24小时（1440分钟）为时间区间，计算任何时刻商品价格。假定当前的前1440分钟平均价格P1，时间区间T1，T1之前1440分钟平均价格为P2,时间区间T2；那么当前价格P3=D1*0.5*T1销量/T2销量，D2不可为0，初始值1。P3最低值为4，不设上限。</div>
    </div>
    <div class="tip">
      <div class="title">提货券使用说明</div>
      <div class="content">1.提货券仅限于易解商城使用；
        2.提货券作为虚拟商品，一旦购买概不退款；
        3.券码是兑换商品的唯一识别码，请自行保管好；
        4.本商城在法律允许范围内拥有提货券的最终解释权；
        5.一张提货券只能兑换一瓶解酒饮料

      </div>
    </div>
    <div class="opts table">
      <div class="buy">
        <span @click="doPay">{{
          this.paying ? "支付中...(" + status + ")" : "立即购买"
        }}</span>
      </div>
    </div>
    <pay-method ref="payMethod"
                :is_jf="is_jf"
                :now_money="now_money">{{
      pay_price
    }}</pay-method>
    <notice ref="notice"
            :autoClose="false"></notice>
    <confirm ref="leaveConfirm"
             :autoClose="false">
      <span slot="btn-left">我已支付</span>
      <span slot="btn-right">离开</span>
    </confirm>

    <div class="yhq_pop"
         v-show="yhq_show">
      <div class="yhq">
        <div class="header">
          <span>优惠券</span>
          <img src="~img/closeTip.png"
               @click="close" />
        </div>
        <div class="main">
          <div class="list"
               v-for="(item, index) in yhq"
               :key="index">
            <div class="one">
              <img src="~img/yhq1.png" />
              <div class="ti">
                <span>{{ parseInt(item.discount_price) }}</span>
              </div>
            </div>
            <div class="two">
              <div class="title">{{ item.title }}</div>
              <div class="date">有效期至{{ item.end_date }}</div>
            </div>
            <div class="three">
              <button @click="userYhq(item)">立即使用</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { Toast, Loading, formatFloat, remainPoint } from "lib";
import { getProductPrice } from "api/index";

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
      currentNum: 0,
      active: 0,
      total_num: 1,
      unitPrice: "",
      yhq: [],
      discount_type: 0,
      ID: "",
      yhq_title: "",
      yhq_price: 0,
      yhq_show: false,
      isReClick: true, // 点击标识
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
      now_money: "", //我的积分余额
      golo_points: 0, //golo 积分
      used_golo_points: false,
      golo_points_money: 0,
      sku_id: ""
    };
  },
  watch: {
    $route() {
      if (this.is_testing_money) {
        this.doPay();
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.is_testing_money) this.$store.commit("testingMoney", false);
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
      // console.log(this.$route.params.info);
      this.getProductPrice(this.$route.params.info.id);
      this.paying = false;
      this.status = 0;
      this.addr = null;
      this.preInfo = {};
      this.info = this.$route.params.info;
      this.orderId = this.$route.params.orderId || "";
      this.sku_id = this.$route.query.sku_id || "";
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
    //流程：下单生成订单id》获取支付参数》调用原生支付》查询订单
    // 获取支付参数
    getNativePayParams(id, type) {
      pay(id, type)
        .then(
          data => {
            if (data) {
              console.log('支付参数获取成功', data)
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
    },
    getCreateOrder(type) {
      createOrder({
        product_id: this.id,
        paytype: type,
        total_num: this.total_num,
        unique: Date.now() + '-' + (++this.currentNum),
        source_type: 'app'
      }).then(
        data => {
          this.isReClick = true;
          if (data && data.order_id) {
            console.log('下单成功', data)
            // 下单成功，触发支付
            this.createdOrderId = data.order_id;
            this.status = 1;
            this.getNativePayParams(data.order_id, type);
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
          this.isReClick = true;
          this.paying = false;
          Toast("下单失败,请稍后再试");
        }
      );
    },
    reduce() {
      if (this.total_num > 1) {
        this.total_num--;
      }
    },
    add() {
      this.total_num++;
    },
    getProductPrice(id) {
      Loading.open();
      getProductPrice({
        product_id: id
      })
        .then(({ product_price }) => {
          this.unitPrice = product_price;
        })
        .finally(() => {
          Loading.close();
        });
    },
    userYhq(args) {
      var { discount_price, title, discount_type, id } = args;
      this.yhq_show = false;
      this.yhq_price = discount_price;
      this.used_golo_points = false;
      this.yhq_title = title;
      this.discount_type = discount_type;
      this.ID = id;
    },
    close() {
      this.yhq_show = false;
    },
    loaddata() {
      getPreOrderProductInfo(
        this.id,
        this.orderId,
        this.$route.params.unique
      ).then(data => {
        if (data) {
          this.preInfo = data;
          this.now_money = data.now_money;
          this.golo_points = data.golo_intergal.golo_points;
          this.golo_points_money = data.golo_intergal.golo_points_money;
          this.yhq_title = data.discount.length + "张优惠券可用";
          this.yhq_title_copy = data.discount.length + "张优惠券可用";
          this.yhq = data.discount;
          this.yhq_price = data.discount_price || 0;
          this.discount_type = 0;
          this.ID = 0;
          this.used_golo_points = false;
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
      }
    },
    //showinfo显示提示
    showinfo() {
      this.$refs.notice.show("在golo APP开车1公里获得1积分");
    },
    check_golo_points() {
      if (this.golo_points > 0) {
        this.used_golo_points = !this.used_golo_points;
        this.pay_price = parseFloat(
          this.pay_price - this.golo_points_money
        ).toFixed(2);
        this.yhq_title = this.yhq_title_copy;
        this.yhq_price = 0;
        this.discount_type = this.used_golo_points ? 4 : 0;
        this.ID = 0;
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
      // 去支付
      let type = ['alipay', 'wechat', 'yue'][this.active]
      Loading.open();
      this.paying = true;
      if (this.orderId || this.createdOrderId) {
        // 已经有订单了,或者已经创建过订单了
        this.status = 1;
        // 发起支付
        this.getNativePayParams(this.orderId || this.createdOrderId, type);
      } else {
        let miandan_type;
        if (this.info.is_platoon == 1 && this.info.is_self_buy_platoon == 1) {
          miandan_type = 1;
        }
        // 创建订单, 避免并发
        if (this.isReClick) {
          this.getCreateOrder(type);
          this.isReClick = false;
        } else {
          Toast("请勿重复提交订单");
          return;
        }
      }


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
    ...mapState(["selectAddress", "buyTotalNum", "is_testing_money", 'currentData']),
    //加减乘除运算，处理精度缺失
    comput() {
      return formatFloat;
    },
    remainPoint() {
      return remainPoint
    },
    //优惠金额
    comDiscount() {
      let price = Number(this.unitPrice);
      for (let i of this.info.discount_list || []) {
        if (price >= i.min && price <= i.max) {
          return this.formatPrice(this.comput(this.comput(1, i.discount, '-'), price, "*"));
        }
      }
      return this.formatPrice(0);
    },
    //true为从现有的订单进入支付页,flase为商品详情进入
    show_model() {
      return !!this.$route.params.orderId;
    },

    //计算优惠
    discountPrice() {
      return this.formatPrice(
        this.comput(this.unitPrice, this.comDiscount, "-")
      );
    },
    //保留小数
    formatPrice() {
      return function (pri, flag) {
        if (!flag) {
          var arr = pri.toString().split("."),
            len = arr.length;
          if (len === 1) {
            return pri + ".00";
          } else {
            if (arr[1].length === 1) {
              return pri + "0";
            } else if (arr[1].length === 2) {
              return pri;
            } else {
              return arr[0] + "." + arr[1].substring(0, 2);
            }
          }
        } else {
          return parseInt(pri);
        }
      };
    },
    //不同进入情况取的总价
    pay_price() {
      let pay_price_temp = this.show_model
        ? this.info.pay_price
        : this.used_golo_points
          ? parseFloat(this.unitPrice * this.total_num - this.golo_points_money)
          : parseFloat(
            this.unitPrice * this.total_num - this.discountPrice
          ).toFixed(2);
      pay_price_temp = pay_price_temp < 0.01 ? 0.01 : pay_price_temp;
      return parseFloat(pay_price_temp).toFixed(2);
    },
    //是否满足积分支付
    is_jf() {
      return parseFloat(this.pay_price) > parseFloat(this.now_money);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
body {
  overflow-x: hidden;
}
::-webkit-scrollbar {
  display: none;
}
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
  position: relative;
  padding-bottom: size(100);
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
    @include txt-overflow(2);
  }
  .type {
    font-size: size(26);
    color: #999;
    margin-top: 4px;
  }
  .price-num {
    margin-top: size(16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: size(20);
    .price {
      font-size: size(26);
      font-weight: bold;
    }
    .setcount {
      width: size(220);
      height: 100%;
      display: flex;
      justify-content: space-between;
      font-size: size(28);
      border-radius: size(2);
      box-sizing: border-box;
      .add,
      .reduce {
        height: size(50);
        width: size(60);
        line-height: size(50);
        text-align: center;
        color: #696969;
        border: size(1) solid #878787;
        box-sizing: content-box;
      }
      .count {
        height: size(50);
        flex: 1;
        text-align: center;
        color: #363636;
        border-top: size(1) solid #878787;
        border-bottom: size(1) solid #878787;
        box-sizing: content-box;
        padding: 0;
        border-radius: 0;
      }
    }
  }
}
.spec {
  margin-top: size(18);
  background: #fff;
  font-size: size(26);
  padding: size(24) size(30);
  line-height: 1.42;
  .co {
    .left {
      float: left;
      position: relative;
    }
    .left.jifen {
      padding-left: size(40);
    }
    .right {
      float: right;
      position: relative;
      > img {
        right: size(0);
      }
    }
    img {
      width: size(30);
      height: size(30);
      position: absolute;
      top: size(5);
    }
    img.one {
      left: 0;
    }
    margin-top: size(20);
    &:first-child {
      margin-top: 0;
    }
  }
}
.col {
  height: size(120);
  padding-left: size(38);
  padding-right: size(42);
  background: white;
  > div {
    vertical-align: middle;
    display: table-cell;
  }
  .icon {
    width: size(32);
    img {
      width: 100%;
      height: size(32);
      display: block;
    }
  }
  .name {
    padding-left: size(28);
    font-size: size(30);
    color: #333;
    .jifen {
      font-size: size(26);
      color: #666;
    }
  }
  .check-icon {
    text-align: right;
    span {
      display: inline-block;
      width: size(40);
      height: size(40);
      @include bg("~img/icon/check.png");
    }
    &.active {
      span {
        @include bg("~img/icon/checked.png");
      }
    }
    &.no_disab {
      span {
        background: #ccc;
        border-radius: 50%;
      }
    }
  }
}
.payType {
  margin-top: size(20);
}
.tip {
  margin: size(20) size(40);
  text-align: justify;
  > .title {
    font-size: size(26);
    font-weight: 600;
    color: #666666;
    line-height: size(40);
  }
  > .content {
    font-size: size(20);
    font-weight: 400;
    color: #b2b6bf;
    line-height: size(36);
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
.spec {
  > .co {
    > .yhq_icon {
      width: size(36);
      height: size(36);
      top: size(2);
      left: size(-2) !important;
    }
  }
}
.yhq_pop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .yhq {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: size(660);
    background: whitesmoke;
    border-radius: size(40) size(40) 0 0;
    font-size: size(28);
    display: flex;
    flex-direction: column;
    .header {
      padding: size(40) size(30) size(30) size(30);
      text-align: center;
      position: relative;
      height: size(40);
      margin-bottom: size(30);
      img {
        width: size(40);
        position: absolute;
        bottom: 0;
        right: size(30);
      }
    }

    .main {
      flex: 1;
      overflow-y: auto;
      margin: 0 size(30) size(30) size(30);
      .list:nth-of-type(1) {
        margin-top: 0;
      }
      .list {
        margin: size(30) 0;
        height: size(150);
        background: white;
        display: flex;
        align-items: center;
        .one {
          width: size(206);
          text-align: center;
          position: relative;
          img {
            width: size(144);
          }
          .ti {
            position: absolute;
            top: 50%;
            right: size(38);
            width: size(88);
            height: size(88);
            transform: translate(0, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: size(34);
              color: #e31436;
            }
          }
        }
        .two {
          flex: 1;
          .title {
            font-size: size(28);
            width: 100%;
          }
          .date {
            font-size: size(20);
            color: gray;
            margin-top: size(20);
          }
        }
        .three {
          width: size(206);
          text-align: center;
          button {
            color: white;
            background: #e70002;
            font-size: size(24);
            padding: size(15);
            border-radius: size(5);
          }
        }
      }
    }
  }
}
</style>
