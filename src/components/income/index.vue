<template>
  <div class="income_warp">
    <div class="topbox">
      <div class="banner">
        <div class="content">
          <div class="title">可提现金额:</div>
          <div class="all_money">
            <span>¥</span>7694.28
          </div>
          <div class="record" @click="tojump('/record')">提现记录</div>
          <div class="detail">
            <div class="left">
              <span>待结算</span>
              <span class="money">
                <span>¥</span> 30614.07
              </span>
            </div>
            <div class="right">
              <span>总收入</span>
              <span class="money">
                <span>¥</span> 40017.25
              </span>
            </div>
          </div>
        </div>
        <div class="withdraw" @click="tojump('/withdraw')">提现</div>
      </div>
      <div class="in-title">
        <span :class="active === 'charge'?'active':''" @click="checkShow('charge')">免单</span>
        <span :class="active === 'earnings'?'active':''" @click="checkShow('earnings')">收益</span>
        <div class="showtitle">{{showtitle}}</div>
      </div>
    </div>
    <keep-alive>
      <mt-tab-container v-model="active" swipeable>
        <mt-tab-container-item
          id="charge"
          v-infinite-scroll="loadCharge"
          infinite-scroll-disabled="leftLoading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <div class="pub_list">
            <div class="item" v-for="(item,index) in leftList" :key="index">
              <div class="queue border-bottom">已成功推荐2人，还剩余4单即可免单</div>
              <div class="detail">
                <div class="img_warp">
                  <img
                    src="https://storemp.golodata.com/public/uploads/attach/2019/04/03/5ca422d1310a3.png"
                    alt
                  />
                </div>
                <div class="desc border-bottom">
                  <div class="name">元征goloX3 智能车联网车载智慧终端汽车诊断仪车载wifi智能盒子行车电脑</div>
                  <div class="ordernum">幸运码640，还有31人等待免单</div>
                </div>
              </div>
              <div class="footer">
                <div class="txt-count">
                  <span>订单尾号810006</span>
                  <span>|</span>
                  <span>已优惠金额 ¥0.00</span>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item
          id="earnings"
          v-infinite-scroll="loadEarnings"
          infinite-scroll-disabled="rightLoading"
          infinite-scroll-distance="10"
        >
          <div class="in_record">
            <div class="item" v-for="(item,index) in rightList" :key="index">
              <div class="left">
                <div class="name">
                  销售返利
                  <span>/待结算</span>
                </div>
                <div class="reason">订单尾号762534销售返利</div>
              </div>
              <div class="right">+10000.00元</div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </keep-alive>
  </div>
</template>

<script>
import tojump from 'mixins/tojump'
export default {
  data() {
    return {
      active: "earnings",
      leftLoading: false,
      leftList: [1, 2, 3, 4, 5],
      rightLoading: false,
      rightList: [1, 2, 3, 4, 5]
    };
  },
  mounted() {},
  methods: {
    checkShow(demo) {
      this.active = demo;
    },
    loadCharge() {
      this.leftLoading = true;
      if (this.active === "charge") {
        setTimeout(() => {
          console.log("111");
          let last = this.leftList[this.leftList.length - 1];
          for (let i = 1; i <= 5; i++) {
            this.leftList.push(last + i);
          }
          this.leftLoading = false;
        }, 500);
      }
    },
    loadEarnings() {
      this.rightLoading = true;
      if (this.active === "earnings") {
        setTimeout(() => {
          console.log("222");
          let last = this.rightList[this.rightList.length - 1];
          for (let i = 1; i <= 5; i++) {
            this.rightList.push(last + i);
          }
          this.rightLoading = false;
        }, 500);
      }
    }
  },
  watch: {
    active(oldVal) {
      if (oldVal === "earnings") {
        this.leftLoading = true;
        this.rightLoading = false;
      } else if (oldVal === "charge") {
        this.leftLoading = false;
        this.rightLoading = true;
      }
    }
  },
  computed: {
    showtitle: function() {
      let title;
      const { active } = this;
      if (active === "earnings") {
        title = "收益及提现结算";
      } else if (active === "charge") {
        title = "如何免单";
      }
      return title;
    }
  },
  mixins:[tojump]
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
    .banner {
      width: 100%;
      height: size(336);
      padding: size(21) size(58) size(46);
      @include bg("~img/shouyi-bg.png");
      color: #fff;
      line-height: 1;
      position: relative;
      .content {
        position: relative;
        z-index: 3;
        .title {
          font-size: size(28);
        }
        .all_money {
          font-size: size(59);
          font-weight: normal;
          font-family: Helvetica;
          font-stretch: normal;
          letter-spacing: size(1);
          padding-top: size(30);
          text-align: center;
          & > span {
            margin-right: size(10);
            font-size: size(35);
            font-weight: 500;
          }
        }
        .record {
          font-family: PingFangSC-Light;
          text-decoration: underline;
          font-size: size(26);
          font-weight: normal;
          font-stretch: normal;
          text-align: center;
        }
        .detail {
          font-size: size(24);
          margin-top: size(41);
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
      .withdraw {
        position: absolute;
        bottom: 0;
        right: 50%;
        z-index: 50;
        transform: translateX(50%) translateY(50%);
        width: size(168);
        height: size(168);
        line-height: size(168);
        border-radius: 50%;
        // box-sizing: border-box;
        background: #ff0000;
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
        padding-left: size(43);
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
            width: size(44);
            height: size(8);
            background: #ff1f3d;
            position: absolute;
            border-radius: size(4);
            left: 52%;
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
        min-height: size(322);
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
          padding: size(30) size(37) size(43) size(20);
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
          padding-right: size(20);
          text-align: right;
          height: size(37);
          line-height: size(37);
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
        }
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>