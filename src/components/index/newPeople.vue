<template>
  <div v-if="newObj.length != 0 && is_fisrt_pop && is_show">
    <popup @mask-click="hide">
      <div class="wrap" @click="goBay">
        <div class="news_box">
          <img class="close" src="~img/closeTip.png" @click="close" />
          <img class="new_bg" :src="newObj[0]?newObj[0].img_url:''" />
          <!--
          <div class="new_msg">
            <div class="discount_name">{{newObj.store_name}}</div>
            <div class="discount">新人专享爆款抢购<span>{{newObj.price}}元</span>包邮！</div>
            <div class="discount_time">{{newObj.valid_time}}小时内购买有效</div>
          </div>
          -->
          <div class="gobaybtn" ></div>
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
import {getNowDate} from "lib";
export default {
  props: {
    newObj: {
      type: Array
    },
    is_fisrt_pop:{
      type: Boolean
    }
  },
  data() {
    return {
      is_show: true
    };
  },
  computed: {
    ...mapState(["isLogin", "isFirst"])
  },
  methods: {
    ...mapMutations(["setFirst"]),
    close() {
      this.is_show = false;
    },
    goBay() {
      localStorage.setItem("new_people_pop_"+getNowDate(), 1); //记录时间
      this.tojump(this.newObj[0].jump_url);
      this.close();
    },
    show(callback) {
      callback().then(res => {
        if (res.length === 0) {
          return;
        } else {
          this.newObj = res[0];
          this.isShow = true;
        }
      });
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
    top: size(70);
  }
  .new_bg {
    width: size(536);
  }
  .new_msg {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: size(467);
    .discount {
      color: #ff9f0e;
      text-align: center;
      font-size: size(32);
      margin-top: size(38);
      > span {
        color: #ff6815;
        font-size: size(38);
      }
    }
    .discount_name {
      color: #ff6815;
      font-size: size(36);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .discount_time {
      font-size: size(32);
      color: #ff9f0e;
      margin-top: size(14);
    }
  }
  .gobaybtn {
    width: size(360);
    height: size(88);
    position: absolute;
    right: size(90);
    bottom: size(6);
    border-radius: size(88);
  }
}
</style>