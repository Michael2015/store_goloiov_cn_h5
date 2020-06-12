<template>
  <div v-if="isShow&&isLogin&&isFirst">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="news_box">
          <img class="close" src="~img/closeTip.png" @click="close" />
          <img class="new_bg" :src="newObj.img_url" @click='$router.push(newObj.jump_url)'/>
          
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
  data() {
    return {
      newObj:{}
    }
  },
  computed: {
    ...mapState(["isLogin", "isFirst"])
  },
  methods: {
    ...mapMutations(["setFirst"]),
    close() {
      this.setFirst(false);
    },
    goBay() {
      this.tojump(`/goods/${this.newObj.pro_id}`);
      this.close();
    },
    show(callback){
      callback().then(res=>{
        if(res.length === 0){
          return
        }else{
          this.newObj = res[0]
          this.isShow = true
        }
      })
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
    top:40%;
    transform: translate(-50%,-50%);
    width: size(467);
    .discount {
      color: #ff9f0e;
      text-align: center;
      font-size: size(32);
      margin-top: size(38);
      >span{
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