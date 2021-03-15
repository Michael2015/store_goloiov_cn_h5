<template>
  <div class="info">
    <div class="info-first">
      <span>123.21</span>
      <span>+2.00</span>
      <span>+2.40</span>
      <i class="before"></i>
    </div>
    <div class="line">
      <div><span class="label">最高：</span><span class="value">15.60</span></div>
      <div><span class="label">成交量：</span><span class="value">当天/累积/1/1000</span></div>
    </div>

    <div class="line">
      <div><span class="label">最低：</span><span class="value">12.60</span></div>
      <div><span class="label">成交额：</span><span class="value">当天/累积/1200.60/11200</span></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
.info {
  margin-left: size(100);

  .info-first {
    display: flex;
    align-items: flex-end;
    position: relative;

    .before {
      position: absolute;
      top: 50%;
      left: 0;
      width: size(10);
      height: size(10);
      border: size(10) solid #f8d7cd;
      border-radius: 50%;
      background: #e2552a;
      transform: translate(-180%, -50%);
      box-sizing: content-box;
    }
    > span {
      font-weight: normal;
      color: #e2552a;
      font-size: size(26);
      margin-right: size(20);
      margin-bottom: size(8);
    }
    > span:nth-of-type(1) {
      font-size: size(60);
      font-weight: bolder;
      margin-bottom: 0;
    }
  }
  .line {
    display: flex;
    margin: size(20) 0;
    span {
      color: #666666;
      font-size: size(20);
    }
    .label {
      color: #b1b1b1;
    }
    .value {
      margin-right: size(50);
    }
  }
}
</style>