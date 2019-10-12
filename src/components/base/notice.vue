<template>
  <div v-show="isShow">
    <popup @mask-click="clickMask">
      <div class="wrap">
        <div class="title">提示</div>
        <div class="notive_tit">{{title}}</div>
        <div class="btns">
          <div class="confirm" @click="click">确定</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popup from "ui/popup";
export default {
  props: {
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: "",
      click: () => {}
    };
  },
  components: {
    popup
  },
  mixins: [showHide],
  methods: {
    show(msg, callback = () => {}) {
      this.isShow = true;
      this.title = msg;
      this.click = () => {
        this.hide();
        callback();
      };
    },
    clickMask() {
      // 点击遮罩层
      if (this.autoClose) {
        this.hide()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  width: size(540);
  min-height: size(268);
  background-color: #ffffff;
  border-radius: size(18);
  padding: size(38) size(54) size(32) size(54);
  .title {
    font-size: size(32);
    color: #353535;
    letter-spacing: size(-1);
    text-align: center;
  }
  .notive_tit {
    font-size: size(28);
    color: #353535;
    letter-spacing: size(-1);
    text-align: center;
    padding: size(40) 0;
    line-height: 1.4;
  }
  .btns {
    font-size: size(26);
    position: relative;
    text-align: center;
    .confirm {
      display: inline-block;
      width: size(220);
      height: size(66);
      line-height: size(66);
      text-align: center;
      border-radius: size(33);
      color: #fff;
      background-image: linear-gradient(135deg,#ff0000 0%,#ff3061 100%);
    }
  }
}
</style>