<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="mask_box">
        <div class="setcount">
          <div class="reduce" @click="reduce">-</div>
          <div class="count">{{total_num}}</div>
          <div class="add" @click="add">+</div>
        </div>
        <div class="confirm" @click="callback(total_num,hide);">立即购买</div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popup from "ui/popup";
import { Toast } from "lib";
export default {
  components: {
    popup
  },
  mixins: [showHide],
  data() {
    return {
      isShow: false,
      total_num: 1,
      newbornzone: {},
      callback: () => {}
    };
  },
  methods: {
    reduce() {
      if (this.total_num <= 1) {
        return;
      }
      this.total_num = --this.total_num;
    },
    add() {
      if (this.newbornzone.is_newborn) {
        if (this.total_num + 1 > this.newbornzone.limit_num) {
          Toast(`最多下单${this.newbornzone.limit_num}个`);
          return;
        }
      }
      this.total_num = ++this.total_num;
    },
    show(newbornzone, callback) {
      this.isShow = true;
      this.newbornzone = newbornzone;
      this.callback = callback;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.mask_box {
  background: #fff;
  width: 80%;
  padding: size(20) size(10);
  border-radius: size(30);
  .setcount {
    margin-bottom: size(20);
    height: size(70);
    display: flex;
    justify-content: space-between;
    .add {
      background: #ff0000;
      height: size(70);
      width: size(70);
      border-radius: 50%;
      line-height: size(70);
      text-align: center;
      color: #fff;
    }
    .reduce {
      background: #ff0000;
      height: size(70);
      width: size(70);
      border-radius: 50%;
      line-height: size(70);
      text-align: center;
      color: #fff;
    }
    .count {
      flex: 1;
      text-align: center;
      color: #b39999;
      line-height: size(70);
    }
  }
  .confirm {
    height: size(90);
    line-height: size(90);
    text-align: center;
    width: 80%;
    background-color: #e70002;
    font-size: size(36);
    color: #ffffff;
    border-radius: size(90);
    margin: 0 auto;
  }
}
</style>