<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  width: size(590);
  height: size(268);
  background-color: #ffffff;
  border-radius: size(18);
  padding: size(46) size(54) size(40) size(54);
  display: flex;
  flex-direction: column;
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
    margin-top: size(20);
  }
  .btns {
    flex: 1;
    font-size: size(26);
    position: relative;
    // display: flex;
    // justify-content: space-between;
    // align-items: flex-end;
    .confirm {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: size(220);
      height: size(66);
      line-height: size(66);
      text-align: center;
      border-radius: size(33);
      border: solid size(2) #6b6b6b;
      color: #333333;
    }
  }
}
</style>