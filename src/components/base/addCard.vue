<template>
  <div v-show="isShow">
    <botPopup @mask-click="hide">
      <div class="wrap">
        
      </div>
    </botPopup>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
import botPopup from 'ui/bottom-popup'
export default {
  components: {
    botPopup
  },
  mixins: [showHide]
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  width: 100%;
  background: #fff;
  height: size(222);
  position: relative;
}
</style>