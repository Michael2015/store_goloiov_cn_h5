<template>
  <div v-show="isShow">
    <popup-goods @mask-click="hide">
      <div class="mask_box" @click.stop>
        <div class="good_msg">
          <img v-if="info.slider_image" :src="info.slider_image[0]" alt />
          <div class="show_price">
            <div
              class="price"
            >价格：¥{{info.newbornzone.is_newborn?info.newbornzone.price:(role===0?info.price:info.vip_price)}}</div>
            <div class="setter">请选择规格属性</div>
          </div>
        </div>
        <div class="title">数量</div>
        <div class="setcount">
          <div class="reduce" @click="reduce">-</div>
          <input class="count" type='number' v-model="total_num" />
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </popup-goods>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popupGoods from "ui/popup-goods";
import { Toast } from "lib";
import { mapState } from "vuex";
export default {
  components: {
    popupGoods
  },
  mixins: [showHide],
  data() {
    return {
      isShow: false,
      total_num: 1,
      info: {
        newbornzone:{}
      }
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
      if (this.info.newbornzone.is_newborn) {
        if (this.total_num + 1 > this.info.newbornzone.limit_num) {
          Toast(`最多下单${this.info.newbornzone.limit_num}个`);
          return;
        }
      }
      this.total_num = ++this.total_num;
    },
    show(info) {
      this.isShow = true;
      this.info = info;
      console.log(this.info);
    }
  },
  computed: {
    ...mapState(["role"])
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.mask_box {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  height: size(900);
  padding: size(36) size(30);
  .good_msg {
    display: flex;
    > img {
      width: size(196);
      height: size(196);
      border-radius: size(4);
      margin-right: size(20);
    }
    .show_price {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .price {
        font-size: size(28);
        color: #fe0000;
        line-height: size(35);
      }
      .setter {
        font-size: size(28);
        color: #333333;
        line-height: size(35);
      }
    }
  }
  .title {
    font-size: size(28);
    line-height: size(35);
    color: #4b4b4b;
    margin-top: size(42);
    margin-bottom: size(12);
  }
  .setcount {
    width: size(320);
    height: size(70);
    line-height: size(70);
    display: flex;
    justify-content: space-between;
    font-size: size(28);
    border-radius: size(2);
    border: size(1) solid #878787;
    box-sizing: border-box;
    overflow: hidden;
    .add {
      height: size(70);
      width: size(94);
      text-align: center;
      color: #696969;
      border-left: size(1) solid #878787;
      box-sizing: content-box;
    }
    .reduce {
      height: size(70);
      width: size(94);
      text-align: center;
      color: #696969;
      border-right: size(1) solid #878787;
      box-sizing: content-box;
    }
    .count {
      flex: 1;
      text-align: center;
      color: #363636;
    }
  }
}
</style>