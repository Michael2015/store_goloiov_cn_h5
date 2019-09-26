<template>
  <div>
    <div class="mask" @click="$emit('mask-click')"></div>
    <div class="slot"><slot></slot></div>
  </div>
</template>

<script>
export default {
  abstract: true,
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.slot>div{
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
}
</style>
