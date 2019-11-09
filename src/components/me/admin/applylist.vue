<template>
  <div class="record_warp">
    <top-head>申请记录</top-head>
    <div class="record_item" v-for="item in showList" :key="item.id" @click="checkitem(item.id)">
      <div class="top">
        <div class="address">{{item.agent_name}}</div>
        <div class="apply">{{adminObj[item.agent_level]}}申请</div>
      </div>
      <div class="bottom">
        <div class="time">{{item.addtime}}</div>
        <div :class="{apply_flag:true,ing:item.status === 0}">{{applyObj[item.status]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_my_region_log } from "api/me";
export default {
  data() {
    return {
      showList: [],
      adminObj: {
        "2": "区/县区域管理员",
        "3": "市区域管理员",
        "4": "省区域管理员"
      },
      applyObj: {
        "0": "审核中",
        "1": " 已通过",
        "-1": "已驳回"
      }
    };
  },
  methods: {
    checkitem(id) {
      this.$router.push(`/applydetail?id=${id}`);
    }
  },
  mounted() {
    get_my_region_log().then(res => {
      res = res.map(item => {
        return {
          ...item,
          addtime: new Date(item.addtime* 1000).toLocaleString()
        };
      });
      this.showList = res;
      
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.record_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .record_item {
    width: 100%;
    height: size(130);
    box-sizing: border-box;
    background-color: #ffffff;
    border: size(1) solid #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: size(21) size(30);
    .top {
      display: flex;
      justify-content: space-between;
      font-size: size(30);
      .address {
        color: #333333;
      }
      .apply {
        color: #000000;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: size(24);
      color: #999999;
      .ing {
        color: #fe0000;
      }
    }
  }
}
</style>