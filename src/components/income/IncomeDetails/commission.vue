<template>
  <div class="warp">
    <div class="award">津贴金额：5元</div>
    <div class="simpleness_show">
      <div class="left">订单号: 1357263</div>
      <div class="right">待发货</div>
    </div>
    <div class="simpleness_show">
      <div class="left">结算状态: 2019年05月21日 03:32:46</div>
      <div class="right">待结算</div>
    </div>
    <div class="simpleness_show">
      <div class="left">津贴原因： 您是购买人的上上级合伙人</div>
      <div class="right"></div>
    </div>
    <div class="good_show">
      <img src="~img/contactIcon.png" alt />
      <div class="good_msg">
        <div class="main_show">
          <div class="desc">
            <div class="good_name">元征goloX3 智能车联网车载智慧终端汽车诊断仪车载wifi智能盒子行车电脑</div>
            <div class="color">黑色</div>
          </div>
          <div class="about_money">
            <div class="money">¥1199.00</div>
            <div class="count">×1</div>
          </div>
        </div>
        <div class="allmoney">
          <span>已优惠金额：￥799.00</span>
          <span></span>
          <span>
            合计：
            <span>￥100.00</span>
          </span>
        </div>
      </div>
    </div>
    <div class="exey_show_list">
      <div class="exey_show">
        <div class="left">订单来源</div>
        <div class="right">少年闰土</div>
      </div>
      <div class="exey_show">
        <div class="left">购买人</div>
        <div class="right">少年闰土</div>
      </div>
      <div class="exey_show">
        <div class="left">下单时间</div>
        <div class="right">2018年10月21日 12:07:59</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  width: 100%;
  height: 100%;
  font-size: size(24);
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
  .simpleness_show {
    margin-top: size(2);
    font-size: size(28);
    color: #9e9e9e;
    height: size(100);
    line-height: size(100);
    padding: 0 size(30);
    display: flex;
    background: #fff;
    .right {
      color: #333333;
      flex: 1;
      text-align: right;
    }
    &:nth-child(1) {
      margin-top: size(20);
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