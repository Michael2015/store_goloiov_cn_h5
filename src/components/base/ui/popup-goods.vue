<template>
  <div>
    <div class="mask-bootom" @touchmove.prevent @click="$emit('mask-click')">
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  abstract: true
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.slot{
  position: relative;
  width: 100%;
  height: 100%;
}
.slot > div {
  position: absolute;
  z-index: 99;
  bottom: 0;
  left: 0;
  z-index: 99;
}
.mask-bootom {
  position: fixed;
  left: 0;
  top: 0;
  bottom: size(100);
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  &.transparent {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
