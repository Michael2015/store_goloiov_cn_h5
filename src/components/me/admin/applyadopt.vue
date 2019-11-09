<template>
  <div class="warp">
    <top-head>区域管理员</top-head>
    <div class="item">
      <div class="left">区域管理员</div>
      <div class="right">{{applyObj.user_name}}</div>
    </div>
    <div class="item">
      <div class="left">管理等级</div>
      <div class="right">{{levelObj[applyObj.agent_level]}}</div>
    </div>
    <div class="item">
      <div class="left">管理区域</div>
      <div class="right">{{applyObj.agent_name}}</div>
    </div>
    <div class="item_b">
      <div class="left">管理权益</div>
      <div class="Equity_item">
        区县区域管理员：销往本市golo产品
        <span>0.5%</span>的提成
      </div>
      <div class="Equity_item">
        市区域管理员：销往本市golo产品
        <span>1%</span>的提成
      </div>
      <div class="Equity_item">
        省区域管理员：销往本省golo产品
        <span>1.5%</span>的提成
      </div>
    </div>
  </div>
</template>

<script>
import { get_my_region_log_detail } from "api/me";
export default {
  data() {
    return {
      applyObj: {},
      levelObj: {
        "2": "区县区域管理员",
        "3": "市区域管理员",
        "4": "省区域管理员"
      }
    };
  },
  mounted() {
      const id = this.$route.query.id
      get_my_region_log_detail(id).then(res=>{
          this.applyObj = res;
      })
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .item {
    height: size(84);
    background: #fff;
    border: size(1) solid #f5f5f5;
    font-size: size(28);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 size(30);
  }
  .item_b {
    background: #fff;
    border: size(1) solid #f5f5f5;
    padding: size(22) size(30) size(43) size(30);
    font-size: size(28);
    .Equity_item {
      color: #666666;
      margin-top: size(15);
      > span {
        color: #fe0000;
      }
    }
  }
  .left {
    color: #333333;
  }
  .right {
    color: #c4c4c6;
  }
}
</style>