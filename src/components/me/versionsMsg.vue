<template>
  <div class="versionsMsg_warp">
    <top-head>版本信息</top-head>
    <img src="~img/shop-logo.png" alt />
    <div class="msg">版本 v2.00</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~css/def";
.versionsMsg_warp {
  & > img {
    width: size(180);
    height: size(180);
    border-radius: size(12);
    margin: size(154) size(285) size(31) size(285);
  }
  .msg {
    font-size: size(28);
    color: #333333;
    height: size(40);
    line-height: size(40);
    text-align: center;
    
  }
}
</style>