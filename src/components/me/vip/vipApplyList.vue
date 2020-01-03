<template>
  <div class="record_warp">
    <top-head>VIP服务商申请记录</top-head>
    <div class="record_item" v-for="item in showList" :key="item.id" @click="checkitem(item.id)">
      <div class="top">
        <div class="address">{{item.shop_name}}</div>
        <div class="apply">{{item.name}}</div>
      </div>
      <div class="bottom">
        <div class="time">{{item.add_time}}</div>
        <div :class="{apply_flag:true,ing:item.status === 0}">{{applyObj[item.status]}}</div>
      </div>
    </div>
    <div v-if="showList.length === 0" class="no-data">
      暂无数据
    </div>
  </div>
</template>

<script>
import { get_vip_apply_log } from "api/me";
export default {
  data() {
    return {
      showList: [],
      applyObj: {
        "0": "审核中",
        "1": " 已通过",
        "-1": "已驳回"
      }
    };
  },
  methods: {
    checkitem(id) {
      this.$router.push(`/vipApplydetail?id=${id}`);
    }
  },
  mounted() {
    get_vip_apply_log().then(res => {
      res = res.map(item => {
        return {
          ...item
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
  .no-data{
  text-align: center;
  padding: size(50) 0;
  color: #999;
  font-size: size(30);
}
}
</style>