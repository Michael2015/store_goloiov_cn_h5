<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="title"><slot></slot>{{msg}}</div>
        <div class="btns">
          <div class="confirm" @click="lcb&&lcb();hide()">确定</div>
          <div class="cancel" @click="rcb&&rcb();hide()">取消</div>
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
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    popup
  },
  mixins: [showHide],
  data() {
    return {
      lcb: null,
      rcb: null,
      msg: ''
    }
  },
  methods: {
    show(msg, lcb, rcb) {
      this.isShow = true
      this.msg = msg || ''
      this.lcb = lcb || null
      this.rcb = rcb || null
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
  .btns {
    flex: 1;
    font-size: size(26);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .confirm {
      width: size(220);
      height: size(66);
      line-height: size(66);
      text-align: center;
      border-radius: size(33);
      border: solid size(2) #6b6b6b;
      color: #333333;
    }
    .cancel {
      width: size(220);
      height: size(66);
      line-height: size(66);
      text-align: center;
      border-radius: size(33);
      background: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
      color: #ffffff;
    }
  }
}
</style>