<template>
  <div v-show="isShow&&isLogin&&isFirst">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="news_box">
          <img class="close" src="~img/closeTip.png" @click="close" />
          <img class="new_bg" src="~img/news.png" />
          <div class="new_msg">
            <div class="discount">0.99元包邮！</div>
            <div class="discount_name">纳米镀膜剂</div>
            <div class="discount_time">48小时内购买有效</div>
          </div>
          <div class="gobaybtn" @click="goBay"></div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import tojump from "mixins/tojump";
import showHide from "mixins/show-hide";
import popup from "ui/popup";
export default {
  computed: {
    ...mapState(["isLogin", "isFirst"])
  },
  methods: {
    ...mapMutations(["setFirst"]),
    close() {
      this.setFirst(false);
    },
    goBay() {
      this.tojump("/goods/1");
      this.close();
    }
  },
  mixins: [showHide, tojump],
  components: {
    popup
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.news_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: size(20);
  .close {
    width: size(50);
    position: absolute;
    right: 0;
    top: size(-55);
  }
  .new_bg {
    width: size(600);
  }
  .new_msg {
    position: absolute;
    right: size(267);
    bottom: size(175);
    .discount {
      font-weight: 550;
      color: #bf0805;
      text-align: center;
      font-size: size(35);
    }
    .discount_name {
      font-weight: 550;
      color: #fff;
      text-align: center;
      margin-top: size(10);
    }
    .discount_time {
      font-size: size(20);
      color: #980120;
      text-align: center;
      margin-top: size(10);
    }
  }
  .gobaybtn {
    width: size(128);
    height: size(175);
    position: absolute;
    right: size(117);
    bottom: size(153);
  }
}
</style>