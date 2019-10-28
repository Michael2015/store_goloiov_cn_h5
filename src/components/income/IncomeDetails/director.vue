<template>
  <div class="warp">
    <top-head>董事股东分红奖励详情</top-head>
    <div class="award">
      奖励金额：{{showObj.income_number}}元
      <div class="task">分红 = 平台月利润*5%股东人数</div>
    </div>
    <div class="simpleness_show">
      <div class="left">奖励金额</div>
      <div class="right">{{showObj.income_number}}</div>
    </div>
    <div class="simpleness_show">
      <div class="left">结算状态</div>
      <div class="right">{{showObj.settle_time}}</div>
    </div>
    <div class="simpleness_show">
      <div class="left">您的等级</div>
      <div class="right">董事股东</div>
    </div>
    <div class="simpleness_show">
      <div class="left">上月团队总利润</div>
      <div class="right">{{showObj.shareholder_income}}元</div>
    </div>
    <div class="simpleness_show">
      <div class="left">股东人数</div>
      <div class="right">{{showObj.shareholder_num}}}人</div>
    </div>
  </div>
</template>

<script>
import loadShowobj from 'mixins/loadShowobj'
export default {
  mixins:[loadShowobj]
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  font-size: size(24);
  .award {
    color: #fff;
    font-size: size(34);
    height: size(163);
    line-height: size(163);
    background: linear-gradient(90deg, #f45445 0%, #e62a21 100%);
    padding: 0 size(40);
    font-family: PingFangSC-Medium;
    position: relative;
    .task {
      position: absolute;
      left: size(40);
      top: size(110);
      font-size: size(26);
      color: rgba(255, 255, 255, 0.7);
      height: size(37);
      line-height: size(37);
    }
  }
  .simpleness_show {
    margin-top: size(2);
    font-size: size(28);
    color: #9e9e9e;
    height: size(88);
    line-height: size(88);
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
}
</style>