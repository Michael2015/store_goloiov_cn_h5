<template>
  <div class="myVisitor_warp">
    <div class="item">
      <img
        src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg"
        alt
      />
      <div class="desc">
        <div class="name">张明</div>
        <div class="describe">买了：元征golox3智能车辆</div>
      </div>
      <div class="time">40分钟前</div>
    </div>
    <div class="item">
      <img
        src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg"
        alt
      />
      <div class="desc">
        <div class="name">张明</div>
        <div class="describe">买了：元征golox3智能车辆网车载超级螺旋爆炸无敌音响</div>
      </div>
      <div class="time">40分钟前</div>
    </div>
    <div class="item">
      <img
        src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg"
        alt
      />
      <div class="desc">
        <div class="name">张明</div>
        <div class="describe">买了：元征golox3智能车辆网车载超级螺旋爆炸无敌音响</div>
      </div>
      <div class="time">40分钟前</div>
    </div>
    <div class="item">
      <img
        src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg"
        alt
      />
      <div class="desc">
        <div class="name">张明</div>
        <div class="describe">买了：元征golox3智能车辆网车载超级螺旋爆炸无敌音响</div>
      </div>
      <div class="time">40分钟前</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~css/def";
.myVisitor_warp {
  padding: 0 size(30) size(20) size(30);
  .item {
    height: size(108);
    background-color: #f8f8f8;
    border-radius: size(80);
    display: flex;
    & > img {
      width: size(80);
      height: size(80);
      border-radius: 50%;
      margin: size(14) size(26) size(14) size(14);
    }
    .desc {
      flex: 1;
      .name {
        font-size: size(28);
        color: #333333;
        height: size(40);
        line-height: size(40);
        margin-top: size(18);
      }
      .describe {
        max-width: size(387);
        font-size: size(24);
        color: #999999;
        height: size(33);
        line-height: size(33);
        margin-top: size(4);
        @include txt-overflow()
      }
    }
    .time {
      width: size(183);
      line-height: size(108);
      font-size: size(24);
      color: #666666;
      padding-left: size(42);
    }
  }
}
</style>