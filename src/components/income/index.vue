<template>
  <div class="income_warp">
    <div class="topbox">
      <div class="banner">
        <div class="circle"></div>
        <div class="content">
          <div class="title">可提现金额</div>
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
      <div class="in-title">
        <span
          :class="active === 'tab-container1'?'active':''"
          @click="checkShow('tab-container1')"
        >我的免单</span>
        <span
          :class="active === 'tab-container2'?'active':''"
          @click="checkShow('tab-container2')"
        >收益</span>
      </div>
    </div>
    <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">
        <div class="tojump">如何免单，查看介绍>></div>
        <div class="pub-list">
          <div class="item">
            <div class="detail border-bottom">
              <div class="img_warp">
                <img src="https://storemp.golodata.com/public/uploads/attach/2019/04/03/5ca422d1310a3.png" alt="">
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
      <mt-tab-container-item id="tab-container2">
        <div class="tojump">收益及提现介绍>></div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "tab-container2"
    };
  },
  mounted() {
    // this.active =
  },
  methods: {
    checkShow(demo) {
      this.active = demo;
    }
  }
};
// tab-container
</script>

<style lang="scss" scoped>
@import "~css/def";

.income_warp {
  padding-bottom: 96px;
  width: 100%;
  height: 100%;
  .topbox {
    padding: 24px 24px 0;
    .banner {
      padding: 46px 58px 46px 48px;
      background: linear-gradient(to right, #ef5456, #e70002);
      border-radius: 8px;
      color: #fff;
      line-height: 1;
      overflow: hidden;
      position: relative;
      .content {
        position: relative;
        z-index: 3;
        .title {
          font-size: 28px;
        }
        .all_money {
          font-size: 48px;
          font-weight: 800;
          padding: 30px 0;
          & > span {
            margin-left: 10px;
            font-size: 28px;
            font-weight: 500;
          }
        }
        .detail {
          font-size: 24px;
          & > span {
            margin-left: 10px;
            font-size: 28px;
            font-weight: 800;
          }
        }
        .withdraw {
          font-size: 30px;
          position: absolute;
          top: 0px;
          right: 0px;
          line-height: 60px;
          height: 64px;
          border: 1px solid #fff;
          border-radius: 30px;
          padding: 0 16px;
          box-sizing: border-box;
          min-width: 120px;
          text-align: center;
        }
      }
      .circle {
        width: 496px;
        height: 496px;
        border-radius: 50%;
        background: #ec3335;
        position: absolute;
        left: 502px;
        top: 120px;
        z-index: 2;
      }
    }
    .in-title {
      font-size: 0;
      color: #999;
      padding: 50px 0 50px;
      line-height: 1;
      & > span {
        font-size: 32px;
        display: inline-block;
        padding: 0 22px;
        &.active {
          color: #333;
          font-weight: 800;
          position: relative;
          &:after {
            content: " ";
            display: block;
            width: 36px;
            height: 5px;
            background: #e70002;
            position: absolute;
            bottom: -20px;
            left: 50%;
            margin-left: -18px;
          }
        }
      }
    }
  }
  .tojump {
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    color: #e80709;
    background: #f9eded;
  }
  .pub-list{
    padding: 0 24px;
    .item{
      padding: 0 24px;
      background: #fff;
      border-radius: 4px;
      margin-top: 10px;
      .detail{
        padding-top: 32px;
        height: 108px;
        position: relative;
        .img_warp{
          width: 90px;
          height: 90px;
          background: #ddd;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 28px;
          &>img{
            display: block;
            width: 100%;
            height: auto;
          }
        }
        .desc{
          padding-left: 114px;
          .name{
            font-size: 28px;
            font-weight: 800;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ordernum{
            font-size: 24px;
            color: #999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 12px;
          }
        }
      }
      .border-bottom::after{
        content: ' ';
        display: block;
        position: absolute;
        width: 100%;
        height: 1px;
        background: #e4e4e4;
        transform: scaleY(.5);
        left: 0;
        bottom: 0;
      }
      .footer{
        min-height: 50px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #999;
        // .txt-count{
        //   &>span{}
        // }
      }
    }
  }
}
</style>