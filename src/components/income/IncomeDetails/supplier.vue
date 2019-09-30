<template>
  <div class="warp">
    <div class="award">分润奖金：20.06元</div>
    <div class="simpleness_show">
      <div class="left">订单号：1357263</div>
      <div class="right"></div>
    </div>
    <div class="simpleness_show">
      <div class="left">类别</div>
      <div class="right">下级开发</div>
    </div>
    <div class="simpleness_show">
      <div class="left">所属商家</div>
      <div class="right">XXXXXXXX</div>
    </div>
    <div class="simpleness_show">
      <div class="left">结算状态</div>
      <div class="right">2018年10月21日 12:07:59</div>
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