<template>
  <div>
    <div class="mask"></div>
    <div class="city-wrap">
      <div class="title">所在地区</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.city-wrap{
  background: #fff;
  min-height: 100px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 999;
  .title{
    line-height: size(100);
  }
}
</style>