<template>
  <div v-show="isShow">
    <botPopup @mask-click="hide">
      <div class="wrap">
        <div class="header">
          请选择银行卡
          <img src="~img/close.png" alt />
        </div>
        <div class="add_card" @click="$emit('add-card')">
          <div class="add">+</div>
          <div class="show_title">
            <div class="title">添加储蓄卡</div>
            <img src="~img/icon/right.png" alt />
          </div>
        </div>
      </div>
    </botPopup>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import botPopup from "ui/bottom-popup";
export default {
  components: {
    botPopup
  },
  mixins: [showHide]
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  width: 100%;
  background: #fff;
  height: size(222);
  position: relative;
  color: #333;
  .header {
    height: size(84);
    line-height: size(84);
    text-align: center;
    font-size: size(30);
    position: relative;
    & > img {
      width: size(32);
      height: size(32);
      position: absolute;
      right: size(30);
      top: size(26);
    }
  }
  .add_card {
    height: size(142);
    line-height: size(142);
    font-size: size(32);
    display: flex;
    .add {
      margin: auto size(20);
      width: size(60);
      height: size(60);
      line-height: size(60);
      text-align: center;
      border-radius: 50%;
      background-color: #fafbfa;
      border: solid 1px #e6e6e6;
      font-size: size(35);
      color: #999999;
    }
    .show_title {
      flex: 1;
      display: flex;
      justify-content: space-between;
      // .title {
      // }
      & > img {
        width: size(18);
        height: size(31);
        margin: auto size(20) auto 0;
      }
    }
  }
}
</style>