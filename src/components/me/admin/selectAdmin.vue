<template>
  <div v-show="isShow">
    <botPopup @mask-click="hide">
      <div class="warp">
        <div class="item" v-for="item in adminObj" :key="item.id" @click="select(item.id)">{{item.title}}</div>
        <div class="exit" @click="select(0)">取消</div>
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
  mixins: [showHide],
  data() {
    return {
      adminObj: [
        {
          id: 4,
          title: "省区域管理员"
        },
        {
          id: 3,
          title: "市区域管理员"
        },
        {
          id: 2,
          title: "县区域管理员"
        }
      ],
      callback: () => {}
    };
  },
  methods: {
    show(callback) {
      this.isShow = true;
      this.callback = callback
    },
    select(id){
        this.callback(id);
        this.hide()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.warp {
  width: 100%;
  background: #efefef;
  position: relative;
  color: #4c4c4c;
  .item {
    width: 100%;
    height: size(104);
    line-height: size(104);
    background: #fff;
    text-align: center;
    border-bottom: size(1) solid #efefef;
  }
  .exit {
    margin-top: size(14);
    width: 100%;
    height: size(104);
    line-height: size(104);
    background: #fff;
    text-align: center;
  }
}
</style>