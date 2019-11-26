<template>
  <div class="income_warp">
    <div class="topbox">
      <div class="banner">
        <div class="content">
          <div class="title">账户余额:</div>
          <div class="all_money">
            <span>¥</span>
            <!--
            -->
            {{isLogin?balance:'0.00'}}
          </div>
          <div class="tixi_money">
            可提现金额：¥ {{isLogin?cash:'0.00'}}
          </div>
          <div class="xf_money">
            可消费金额：¥ {{isLogin?cons:'0.00'}}
          </div>
          <div class="record" @click="record">提现记录</div> 
          <div class="detail">
            <div class="left">
              <span>待结算</span>
              <span class="money">
                <span>¥</span>
                {{isLogin?uncash:'0.00'}}
              </span>
            </div>
            <div class="right">
              <span>总收入</span>
              <span class="money">
                <span>¥</span>
                {{isLogin?all:'0.00'}}
              </span>
            </div>
          </div>
        </div>
        <div class="withdraw-wrap">
          <div class="withdraw" @click="withdraw">提现</div>
        </div>
      </div>
      <div class="in-title">
        <span :class="{active: active === 'charge'}" @click="checkShow('charge')">免单</span>
        <span :class="{active: active === 'earnings'}" @click="checkShow('earnings')">收益</span>
        <div class="showtitle" @click="tojieshao">{{showtitle}}</div>
      </div>
    </div>
    <keep-alive>
      <mt-tab-container v-model="active" swipeable>
        <!-- 免单列 -->
        <mt-tab-container-item id="charge">
          <load-more v-slot="{list}" :getData="isLogin?loadCharge:null" ref="charge">
            <div class="pub_list">
              <div
                class="item"
                v-for="(item,index) in list"
                :key="index"
                @click="clickMianDan(item.order_id,item.user_id,item.type_num)"
              >
                <div class="queue border-bottom" v-if="item.left&&item.left !== ''">{{item.left}}</div>
                <div class="detail">
                  <div class="img_warp">
                    <img :src="item.image" alt />
                  </div>
                  <div class="desc border-bottom">
                    <div class="name">{{item.store_name}}</div>
                    <div class="ordernum">{{item.right}}</div>
                  </div>
                </div>
                <div class="footer">
                  <div class="txt-count">
                    <span>订单尾号{{tailSix(item.order_sn)}}</span>
                    <span>|</span>
                    <span v-if="item.coupon_price">已优惠金额 ¥{{item.coupon_price}}</span>
                  </div>
                </div>
              </div>
            </div>
          </load-more>
          <div class="no_login" v-if="!isLogin">暂无数据</div>
        </mt-tab-container-item>

        <!-- 收益列 -->
        <mt-tab-container-item id="earnings">
          <load-more v-slot="{list}" :getData="isLogin?loadEarnings:null" ref="earnings">
            <div class="in_record">
              <div
                class="item"
                v-for="(item,index) in list"
                :key="index"
                @click="clickShouYi(item.type,item.order_id,item.order_sn, item.user_id,item.type_num)"
              >
                <div class="left">
                  <div class="name">
                    {{item.type_text}}
                    <!-- {{item.type}} -->
                    <!-- <span>/待结算</span> -->
                  </div>
                  <div class="reason">{{item.title}}</div>
                </div>
                <div class="right">{{item.pm?'+':'-'}}{{item.number}}元</div>
              </div>
            </div>
          </load-more>
          <div class="no_login" v-if="!isLogin">暂无数据</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </keep-alive>
    <notice ref="notive" :autoClose="true"></notice>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
import { mapState } from "vuex";
import notice from "base/notice";
import { incomeList, platoonList, getUserAmount } from "api/income";
import LoadMore from "base/load-more";
import { login } from "api/login";
import { Toast } from "lib";
export default {
  data() {
    return {
      active: "earnings",
      balance: "0.00", //账户余额
      cash: "0.00", //可提现金额
      cons: "0.00", // 可消费金额
      uncash: "0.00", //待结算金额
      all: "0.00", //总收入金额
      jumpObj: {
        benifit: "/benifit", //返利详情
        commission: "/commission", //合伙人津贴详情
        public: "/public", //免单详情
        refund: "/order-detail", //  商品奖励退款
        pay_product_refund: "/order-detail", //订单退款
        allowance: "/allowance", //管理律贴
        supplier: "/supplier", //开发供应商
        share_bonus: "/director", //董事分红详情
        develop_bonus: "/cultivate", //培养合伙人
        regional_agent:'/region' //区域合伙人
      }
    };
  },
  mounted() {
    getUserAmount().then(reque => {
      this.cash = reque.cash_money;
      this.balance = reque.can_withdraw;
      this.cons = reque.can_consume;
      this.uncash = reque.unsettled_money;
      this.all = reque.total_money;
      this.$refs.charge.disabled = true;
    });
  },
  methods: {
    checkShow(demo) {
      this.active = demo;
      if (this.active === "charge") {
        this.$refs.charge.disabled = false;
        this.$refs.earnings.disabled = true;
      } else if (this.active === "earnings") {
        this.$refs.earnings.disabled = false;
        this.$refs.charge.disabled = true;
      }
      // 处理首次切换不加载
      // if (this.isLogin && demo === "charge" && this.leftList.length === 0) {
      //   this.loadCharge();
      // }
    },
    loadCharge(page, size) {
      return platoonList(page, size);
    },
    loadEarnings(page, size) {
      return incomeList(page, size);
    },
    record() {
      if (this.isLogin) {
        this.tojump("/record");
      } else {
        this.$refs.notive.show("请先登录", () => {
          login();
        });
      }
    },
    withdraw() {
      if (this.isLogin) {
        if (this.cash === "0.00") {
          Toast('无可提现金额');
          return;
        }
        this.tojump("/withdraw");
      } else {
        this.$refs.notive.show("请先登录", () => {
          login();
        });
      }
    },
    // 获取订单号后六位
    tailSix(str) {
      let s = str;
      return s.substr(s.length - 6, 6);
    },
    // 收益列表点击
    clickShouYi(type, id, sn, uid,type_num) {
      console.log(type);
      let url;
      url = this.jumpObj[type];
      if (type === "pay_product_refund" || type === "refund") {
        //  跳转订单详情那order_sn去查询
        url += `/${sn}`;
      } else {
        url += `?order_id=${id}&user_id=${uid}&type_num=${type_num}&order_sn=${sn}`;
      }
      this.tojump(url);
    },
    clickMianDan(id,uid,type_num) {
      this.tojump(`/public?order_id=${id}&user_id=${uid}&type_num=${type_num}`);
    },
    tojieshao() {
      if (this.active === "charge") {
        this.tojump("/gongpaijieshao");
      } else if (this.active === "earnings") {
        this.tojump("/incomejieshao");
      }
      // this.tojump()
    }
  },
  watch: {
    active(oldVal) {
      if (oldVal === "earnings") {
        this.$refs.earnings.disabled = false;
        this.$refs.charge.disabled = true;
      } else if (oldVal === "charge") {
        this.$refs.charge.disabled = false;
        this.$refs.earnings.disabled = true;
      }
    }
  },
  computed: {
    showtitle: function() {
      let title;
      const { active } = this;
      if (active === "earnings") {
        title = "";
        // title = "收益及提现结算";
      } else if (active === "charge") {
        title = "如何免单";
      }
      return title;
    },
    ...mapState(["isLogin"])
  },
  mixins: [tojump],
  components: {
    notice,
    LoadMore
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.income_warp {
  padding-bottom: size(96);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .topbox {
    // padding: size(24) size(24) 0;
    position: relative;
    overflow: hidden;
    &:after {
      content: " ";
      display: block;
      position: absolute;
      @include circle(486);
      background-image: linear-gradient(49deg, #ef5456 0%, #ea1b1d 66%);
      top: size(-(486 - 240));
      right: size(-(486 - 214));
    }
    .banner {
      width: 100%;
      height: size(380);
      padding: size(21) size(58) size(8);
      // @include bg("~img/shouyi-bg.png");
      background-image: linear-gradient(236deg, #ef5456 0%, #e70002 100%);
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      color: #fff;
      line-height: 1;
      position: relative;
      &:after {
        content: " ";
        display: block;
        position: absolute;
        @include circle(486);
        background-image: linear-gradient(49deg, #ef5456 0%, #ea1b1d 66%);
        top: size(-(486 - 240));
        right: size(-(486 - 214));
      }
      .content {
        position: relative;
        z-index: 3;
        height: 100%;
        .title {
          font-size: size(28);
          padding-top: size(40);
          color: #ffe9ef;
        }
        .all_money {
          font-size: size(59);
          font-weight: normal;
          font-family: Helvetica;
          font-stretch: normal;
          letter-spacing: size(1);
          padding-top: size(0);
          text-align: center;
          line-height: 1;
          & > span {
            margin-right: size(10);
            font-size: size(35);
            font-weight: 500;
            vertical-align: middle;
          }
        }
        .tixi_money{
          text-align: center;
          color: #ffe9ef;
          font-size: size(20);
          padding-top: size(12);
          margin-bottom: size(15);
        }
        .xf_money{
          text-align: center;
          color: #ffe9ef;
          font-size: size(20);
        }
        .record {
          font-family: PingFangSC-Light;
          text-decoration: underline;
          position: absolute  ;
          top: size(32);
          right: size(10);
          font-size: size(26);
          font-weight: normal;
          font-stretch: normal;
          text-align: center;
          color: #ffe9ef;
          margin-top: size(12);
        }
        .detail {
          font-size: size(24);
          position: absolute;
          width: 100%;
          bottom: size(12);
          left: 0;
          display: flex;
          justify-content: space-between;
          & div > span {
            display: block;
            font-size: size(24);
            text-align: center;
            height: size(33);
            line-height: size(33);
            &.money {
              font-family: PingFangSC-Medium;
              margin-top: size(6);
              font-size: size(32);
              height: size(45);
              line-height: size(45);
              & > span {
                font-size: size(20);
              }
            }
          }
        }
      }
      .withdraw-wrap {
        position: absolute;
        bottom: 0;
        right: 50%;
        z-index: 2;
        transform: translateX(50%) translateY(50%);
        width: size(168 + 14 * 2);
        height: size(168 + 14 * 2);
        padding: size(14);
        line-height: size(168);
        border-radius: 50%;
        background: #fff;
      }
      .withdraw {
        @include fill;
        border-radius: 50%;
        // box-sizing: border-box;
        // background: #ff0000;
        background-image: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-size: size(34);
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: size(1);
        box-shadow: 0 size(2) size(16) 0 #df3032;
        &:active {
          box-shadow: 0 size(2) size(30) 0 #df3032;
        }
      }
    }
    .in-title {
      font-size: 0;
      color: #666;
      padding: size(105) 0 size(34) size(9);
      line-height: 1;
      position: relative;
      & > span {
        font-size: size(34);
        display: inline-block;
        margin-left: size(43);
        height: size(48);
        line-height: size(48);
        font-family: PingFangSC-Regular;
        &.active {
          color: #333;
          position: relative;
          font-family: PingFangSC-Medium;
          font-weight: 800;
          &:after {
            content: " ";
            display: block;
            width: 100%;
            height: size(8);
            background: #ff1f3d;
            position: absolute;
            border-radius: size(4);
            left: 50%;
            transform: translateX(-50%)
          }
        }
      }
      .showtitle {
        position: absolute;
        right: size(30);
        top: size(142);
        height: size(33);
        line-height: size(33);
        color: #ff0000;
        font-size: size(24);
      }
    }
  }
  .mint-tab-container {
    flex: 1;
    overflow: auto;

    // /deep/ .mint-tab-container-wrap {
    //   flex: 1;
    //   overflow: auto;
    // }
    // .mint-tab-container-item{
    //   overflow: auto;
    // }
    .border-bottom {
      position: relative;
    }
    .border-bottom::after {
      content: " ";
      display: block;
      position: absolute;
      width: 100%;
      height: size(1);
      background: #edecec;
      transform: scaleY(0.5);
      left: 0;
      bottom: 0;
    }
    .pub_list {
      padding: 0 size(30);
      .item {
        background: #f7f7f7;
        // min-height: size(322);
        margin-top: size(14);
        &:nth-child(1) {
          margin-top: 0;
        }
        .queue {
          color: #f92c2c;
          font-size: size(24);
          height: size(74);
          line-height: size(74);
          text-align: right;
          padding-right: size(20);
        }
        .detail {
          padding: size(30) size(20) size(0) size(20);
          display: flex;
          .img_warp {
            & > img {
              width: size(120);
              height: size(120);
            }
          }
          .desc {
            flex: 1;
            margin-left: size(20);
            .name {
              height: size(39);
              line-height: size(39);
              font-size: size(28);
              color: #333333;
              @include txt-overflow();
            }
            .ordernum {
              margin-top: size(12);
              color: #999;
              font-size: size(24);
            }
          }
        }
        .footer {
          font-size: size(26);
          color: #333;
          padding: size(13) size(20) size(17);
          text-align: right;
          .txt-count {
            & > span {
              &:nth-child(2) {
                padding: 0 size(4);
              }
            }
          }
        }
      }
    }
    .in_record {
      padding: 0 size(30) 0;
      .item {
        display: flex;
        min-height: size(150);
        align-items: center;
        padding-left: size(20);
        padding-right: size(23);
        background: #f7f7f7;
        margin-top: size(14);
        .left {
          width: 70%;
          .name {
            color: #333;
            font-size: size(28);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: size(-1);
            height: size(40);
            line-height: size(40);
            & > span {
              color: #000;
            }
          }
          .reason {
            color: #666;
            font-size: size(24);
            margin-top: size(17);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: size(33);
            line-height: size(33);
          }
        }
        .right {
          width: 30%;
          text-align: right;
          font-size: size(30);
          color: #ff0000;
          @include txt-overflow();
        }
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}
.no_login {
  padding: size(20) 0;
  line-height: 1.6;
  font-size: size(24);
  text-align: center;
  color: #666;
}
</style>