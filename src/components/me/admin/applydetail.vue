<template>
  <div class="apply_warp">
    <top-head>申请区域管理员</top-head>
    <div class="item">
      <div class="left">审核状态</div>
      <div :class="{red:showObj.status == 0,pink:showObj.status == -1}">{{applyObj[showObj.status]}}</div>
    </div>
    <div class="item">
      <div class="left">审核人</div>
      <div class="pink">管理员</div>
    </div>
    <div class="item">
      <div class="left">申请手机</div>
      <div class="pink">{{showObj.phone}}</div>
    </div>
    <div class="item">
      <div class="left">申请类型</div>
      <div class="pink">{{levelObj[showObj.agent_level]}}</div>
    </div>
    <div class="item">
      <div class="left">申请城市</div>
      <div class="pink">{{showObj.agent_name}}</div>
    </div>
    <div class="item_b">
      <div class="left">申请原因</div>
      <textarea cols="30" rows="10" :value="showObj.mark" disabled></textarea>
    </div>
    <!-- <div class="item_b">
        <div class="left">驳回原因</div>
        <textarea cols="30" rows="10"></textarea>
    </div>-->
  </div>
</template>

<script>
import { get_my_region_log_detail } from "api/me";
export default {
  data() {
    return {
      showObj: {},
      applyObj: {
        "0": "审核中",
        "1": " 已通过",
        "-1": "已驳回"
      },
      levelObj: {
        "2": "区县区域管理员",
        "3": "市区域管理员",
        "4": "省区域管理员"
      }
    };
  },
  mounted() {
    const id = this.$route.query.id;
    get_my_region_log_detail(id).then(res => {
      this.showObj = res;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.apply_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .left {
    color: #333333;
  }
  .red {
    color: #fe0000;
  }
  .pink {
    color: #c4c4c6;
  }
  .item {
    height: size(84);
    display: flex;
    justify-content: space-between;
    padding: 0 size(30);
    align-items: center;
    font-size: size(28);
    background: #fff;
    border: size(1) solid #f5f5f5;
  }
  .item_b {
    background: #fff;
    font-size: size(28);
    padding: size(22) size(30);
    border: size(1) solid #f5f5f5;
    > textarea {
      margin-top: size(22);
      font-size: size(28);
      color: #c4c4c6;
    }
  }
}
</style>