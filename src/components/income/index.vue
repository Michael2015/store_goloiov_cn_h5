<template>
  <div class="income_warp">
    <div class="topbox">
      <div class="banner">
        <div class="content">
          <div class="title">可提现金额:</div>
          <div class="all_money">
            <span>¥</span>7694.28
          </div>
          <div class="detail">
            待结算 ¥
            <span>30614.07</span> | 总收入 ¥
            <span>40017.25</span>
          </div>
          <div class="withdraw">提现</div>
        </div>
      </div>
      <!-- <div class="in-title">
        <span :class="active === 'charge'?'active':''" @click="checkShow('charge')">我的免单</span>
        <span :class="active === 'earnings'?'active':''" @click="checkShow('earnings')">收益</span>
      </div> -->
    </div>
    <!-- <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item
        id="charge"
        v-infinite-scroll="loadCharge"
        infinite-scroll-disabled="leftLoading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false"
      >
        <div class="tojump">如何免单，查看介绍>></div>
        <div class="pub_list">
          <div class="item" v-for="(item,index) in leftList" :key="index">
            <div class="detail border-bottom">
              <div class="img_warp">
                <img
                  src="https://storemp.golodata.com/public/uploads/attach/2019/04/03/5ca422d1310a3.png"
                  alt
                />
              </div>
              <div class="desc">
                <div class="name">元征goloX3 智能车联网车载智慧终端汽车诊断仪车载wifi智能盒子行车电脑</div>
                <div class="ordernum">幸运码711</div>
              </div>
            </div>
            <div class="footer">
              <div class="txt-count">
                <span>订单尾号：810006</span>
                <span>|</span>
                <span>已优惠金额：0.00</span>
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
        <div class="tojump">收益及提现介绍>></div>
        <div class="in_record">
          <div class="item border-bottom" v-for="(item,index) in rightList" :key="index">
            <div class="left">
              <div class="name">
                免单奖励（待结算）
                <span>2019-09-16 15:43:19</span>
              </div>
              <div class="reason">订单尾号810006免单奖励</div>
            </div>
            <div class="right">+ 1199.00</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container> -->
  </div>
</template>

<script>
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
  }
};
// tab-container
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
      // height: size(336);
      height: size(445);
      padding: size(21) size(58) size(46);
      background-image: url('~img/shouyi-bg.png');
      background-size: 100% 100%;
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
          padding: size(30) 0;
          text-align: center;
          & > span {
            margin-right: size(10);
            font-size: size(35);
            font-weight: 500;
          }
        }
        .detail {
          font-size: size(24);
          & > span {
            margin-left: size(10);
            font-size: size(28);
            font-weight: 800;
          }
        }
        .withdraw {
          font-size: size(30);
          position: absolute;
          top: 0;
          right: 0;
          line-height: size(60);
          height: size(64);
          border: size(1) solid #fff;
          border-radius: size(30);
          padding: 0 size(16);
          box-sizing: border-box;
          min-width: size(120);
          text-align: center;
        }
      }
    }
    .in-title {
      font-size: 0;
      color: #999;
      padding: size(50) 0 size(50);
      line-height: 1;
      & > span {
        font-size: size(32);
        display: inline-block;
        padding: 0 size(22);
        &.active {
          color: #333;
          font-weight: 800;
          position: relative;
          &:after {
            content: " ";
            display: block;
            width: size(36);
            height: size(5);
            background: #e70002;
            position: absolute;
            bottom: size(-20);
            left: 50%;
            margin-left: size(-18);
          }
        }
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
    .tojump {
      line-height: size(80);
      text-align: center;
      font-size: size(30);
      color: #e80709;
      background: #f9eded;
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
      background: #e4e4e4;
      transform: scaleY(0.5);
      left: 0;
      bottom: 0;
    }
    .pub_list {
      padding: 0 size(24);
      .item {
        padding: 0 size(24);
        background: #fff;
        border-radius: size(4);
        margin-top: size(10);
        .detail {
          padding-top: size(32);
          height: size(108);
          position: relative;
          .img_warp {
            width: size(80);
            height: size(80);
            background: #ddd;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: size(28);
            & > img {
              display: block;
              width: 100%;
              height: auto;
            }
          }
          .desc {
            padding-left: size(114);
            .name {
              font-size: size(28);
              font-weight: 800;
              color: #333;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .ordernum {
              font-size: size(24);
              color: #999;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: size(12);
            }
          }
        }
        .footer {
          min-height: size(50);
          display: flex;
          align-items: center;
          font-size: size(24);
          color: #999;
          // .txt-count{
          //   &>span{}
          // }
        }
      }
    }
    .in_record {
      padding: 0 size(24) 0;
      .item {
        display: flex;
        min-height: size(146);
        align-items: center;
        padding-left: size(20);
        .left {
          width: 70%;
          .name {
            color: #333;
            font-size: size(28);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            & > span {
              font-size: size(24);
              color: #999;
            }
          }
          .reason {
            color: #666;
            font-size: size(24);
            margin-top: size(16);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .right {
          width: 30%;
          text-align: right;
          font-size: size(28);
          color: #e70002;
          font-weight: 800;
        }
      }
    }
  }
}
</style>