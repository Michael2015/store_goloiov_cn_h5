<template>
  <div class="income_warp">
    <top-head>我的收益</top-head>

    <div class="topbox">
      <div class="banner">
        <i class="iconfont wenhao">&#xe605;</i>
        <div class="content">
          <div class="remain">账号总余额</div>
          <div class="jifen-num">￥{{ getFloat(info.profit || 0, 2) }}</div>
        </div>
        <div class="cumulat">
          <div class="left">
            <p>已提现</p>
            <p>{{ getFloat(info.get_withdrawal_total || 0, 2) }}</p>
          </div>
          <div class="right">
            <p>累计收入</p>
            <p>{{ getFloat(info.get_income_total || 0, 2) }}</p>
          </div>
        </div>
        <!-- <div class="withdraw-wrap">
          <div class="withdraw"
               @click="withdraw">提现</div>
        </div> -->
      </div>
    </div>

    <div class="loadmore">
      <li class="list-title">
        <span>日期</span>
        <span>类型</span>
        <span>说明</span>
        <span>数值</span>
        <span>状态</span>
      </li>
      <Load-more
        v-if="uniqueNum"
        v-slot="{ list }"
        :getData="getMyProfit"
        :setSize="20"
        @getResData="getResData"
        useListName="list"
      >
        <li v-for="i in list" class="list-item" :key="i.id">
          <span>{{ formatDate(i.add_time) }}</span>
          <span>{{ i.type }}</span>
          <span>{{ i.explain }}</span>

          <span class="num" :class="Number(i.amount) > 0 ? 'red' : ''">{{
            formatNum(i.amount)
          }}</span>
          <span class="blue" :class="i.status === '去提现' ? 'redBtn' : ''">{{
            i.status
          }}</span>
        </li>
      </Load-more>
    </div>
    <notice ref="notive" :autoClose="true"></notice>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
import hasToken from "mixins/hasToken";

import { mapState } from "vuex";
import notice from "base/notice";
import { getMyProfit } from "api/income";
import LoadMore from "base/load-more";
import { login } from "api/login";
import { Toast, Loading, getFloat, formatDate } from "lib";
export default {
  data() {
    return {
      nums: 10,
      info: {},
      loading: false,
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
        regional_agent: "/region" //区域合伙人
      }
    };
  },
  mounted() {
    /*  getUserAmount().then(reque => {
       this.cash = reque.cash_money;
       this.balance = reque.can_withdraw;
       this.cons = reque.can_consume;
       this.uncash = reque.unsettled_money;
       this.all = reque.total_money;
       this.$refs.charge.disabled = true;
     }); */
  },

  methods: {
    getFloat,
    getResData(e) {
      this.info = e;
    },
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
          Toast("无可提现金额");
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
    clickShouYi(type, id, sn, uid, type_num) {
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
    clickMianDan(id, uid, type_num) {
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
    formatNum() {
      return n => {
        let a = Number(n);
        if (a > 0) return "+" + n;
        else return n;
      };
    },
    formatDate() {
      return formatDate;
    },
    getMyProfit() {
      return getMyProfit;
    },
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
    ...mapState(["isLogin", "token"])
  },
  mixins: [tojump, hasToken],
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
  position: relative;
  .topbox {
    // padding: size(24) size(24) 0;
    position: fixed;
    top: size(88);
    overflow: hidden;
    background: #fff;
    height: size(500);
    width: 100%;
    box-shadow: 0 1px 5px #eee;
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
      z-index: 99;
      &:after {
        content: " ";
        display: block;
        position: absolute;
        @include circle(486);
        background-image: linear-gradient(49deg, #ef5456 0%, #ea1b1d 66%);
        top: size(-(486 - 240));
        right: size(-(486 - 214));
        z-index: -1;
      }
      .wenhao {
        position: absolute;
        top: size(20);
        right: size(30);
        z-index: 99;
      }
      .content {
        text-align: center;
        .remain {
          font-size: size(28);
          margin: size(50) 0 size(30);
        }
        .jifen-num {
          display: inline-block;
          font-size: size(52);
          font-weight: bolder;
          position: relative;
          white-space: nowrap;
          > span {
            font-size: size(28);
            font-weight: normal;
            position: absolute;
            bottom: size(4);
            right: size(-10);
            transform: translate(100%, 0);
            white-space: nowrap;
          }
        }
      }
      .cumulat {
        position: absolute;
        bottom: size(30);
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 size(40);
        font-size: size(28);
        p {
          margin: size(20) 0;
        }
        .right {
          text-align: right;
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
  }
  .loadmore {
    margin-top: size(500);
    padding: 0 size(30);
    li {
      list-style: none;
      height: size(100);
      line-height: size(100);
      border-bottom: 1px solid #d7d7d7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 size(10);
      font-size: size(28);
      color: #666;
      > span {
        text-align: center;
        min-width: size(100);
      }
      > span:nth-of-type(1) {
        text-align: left;
        padding-left: size(10);
      }
      > span:nth-last-of-type(1) {
        text-align: right;
        padding-right: size(10);
      }

      .num {
        font-weight: bold;
      }
      .red {
        color: #ea1f21;
      }
      .blue {
        color: gray;
        border: 1px solid gray;
        height: size(50);
        line-height: size(50);
        border-radius: size(25);
      }
      .redBtn {
        background: #ea1f21;
        color: white;
      }
    }
  }
  .mint-tab-container {
    flex: 1;
    overflow: auto;
    position: absolute;
    width: 100%;
    top: size(500);
    bottom: size(100);
    .touch-no {
      padding-bottom: size(10);
    }
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
          // height: size(30);
          font-size: size(28);
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
