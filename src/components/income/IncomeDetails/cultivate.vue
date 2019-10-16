<template>
  <div class="warp">
    <top-head>培养合伙人奖励详情</top-head>
    <div class="award">奖励金额：{{showObj.income_number}}元</div>
    <div class="simpleness_show">
      <div class="left">结算状态</div>
      <div class="right">{{showObj.refund_reason_time}}</div>
    </div>
    <div class="simpleness_show">
      <div class="left">被培养人</div>
      <div class="right">少年闰土</div>
    </div>
    <div class="simpleness_show">
      <div class="left">达成级别</div>
      <div class="right">区县合伙人</div>
    </div>
    <div class="simpleness_show">
      <div class="left">您的等级</div>
      <div class="right">市级合伙人</div>
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