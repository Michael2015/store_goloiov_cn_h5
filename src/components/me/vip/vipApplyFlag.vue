<template>
  <div class="warp">
    <top-head>VIP服务商申请详情</top-head>
    <div class="main">
      <img class src="~img/me/audit.gif" />
      <div class="title">
        <div class="p">我们已收到您的VIP服务商申请表，</div>
        <div class="p">我们将会尽快与您联系，请保存电话畅通。</div>
      </div>
    </div>
    <div class="apply_jilu" @click="vipApplylist">申请记录</div>
  </div>
</template>
<script>
export default {
  methods: {
    vipApplylist() {
      this.$router.push("/vipApplylist");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.warp {
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    position: relative;
    > img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: size(438);
      margin: size(122) auto size(65) auto;
    }
    .title {
      position: absolute;
      top: size(515);
      left: 50%;
      transform: translateX(-50%);
      .p {
        font-size: size(28);
        color: #333333;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
  .apply_jilu {
    font-size: size(26);
    letter-spacing: size(1);
    color: #0091ff;
    position: fixed;
    bottom: size(26);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>