<template>
  <div class="item">
    <div class="title">
      <div class="left">{{this.type === 'my'?'我的等级':'下一等级'}}</div>
      <div class="right">{{partnerLevelObj[this.levelId]}}</div>
    </div>
    <div :class="this.levelId ===0?'no':'content'">
      <div class="content_warp">{{this.levelId === 0?'我的权益':'等级权益'}}</div>
      <div class="content_main" v-if="this.levelId===0">无</div>
      <div class="content_main" v-if="this.levelId===1">获得推广津贴权益，当您的下级发展的团队有人购买商品，您将获得商品相应的津贴</div>
      <div class="content_main" v-if="this.levelId===2">
        <div class="main_item">1.获得推广津贴权益，当您的下级发展的团队有人购买商品，您将获得商品相应的津贴</div>
        <div class="main_item">
          2.开发供货商，获得该供货商利润的
          <span>30%</span>
        </div>
        <div class="main_item">
          3.获得管理津贴，当您或您的下线购买商品，您将获得
          <span>2%</span>的管理津贴
        </div>
      </div>
      <div class="content_main" v-if="this.levelId===3">
        <div class="main_item">1.获得推广津贴权益，当您的下级发展的团队有人购买商品，您将获得商品相应的津贴</div>
        <div class="main_item">
          2.开发供货商，获得该供货商利润的
          <span>45%</span>
        </div>
        <div class="main_item">
          3.获得管理津贴，当您自己购买商品时您将获得
          <span>4%</span>的管理津贴
        </div>
        <div class="main_item">
          4.当您的下线购买商品，您将获得
          <span>4%</span>减去符合条件的上级应得的管理津贴
        </div>
      </div>
      <div class="content_main" v-if="this.levelId===4">
        <div class="main_item">1.获得推广津贴权益，当您的下级发展的团队有人购买商品，您将获得商品相应的津贴</div>
        <div class="main_item">
          2.开发供货商，您将获得该供货商利润的
          <span>60%</span>
        </div>
        <div class="main_item">
          3.获得管理津贴，当您自己购买商品时您将获得
          <span>6%</span>的管理津贴
        </div>
        <div class="main_item">
          4.当您的下线购买商品，您将获得
          <span>6%</span>减去符合条件的上级应得的管理津贴
        </div>
      </div>
      <div class="content_main" v-if="this.levelId===5">
        <div class="main_item">1.获得推广津贴权益，当您的下级发展的团队有人购买商品，您将获得商品相应的津贴</div>
        <div class="main_item">
          2.开发供货商，您将获得该供货商利润的
          <span>60%</span>
        </div>
        <div class="main_item">
          3.当您当下线开发供货商，您将获得：
          <span>60%</span> - 开发供货商上级应得利润 - 开发供货商上上级应得利润
        </div>
        <div class="main_item">
          4.获得管理津贴，当您自己购买商品时您将获得
          <span>8%</span>的管理津贴
        </div>
        <div class="main_item">
          5.当您的下线购买商品，您将获得
          <span>8%</span>减去符合条件的上级应得的管理津贴
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partnerLevelObj from "mixins/partner-level-obj";
export default {
  props: ["type", "levelId"],
  mixins: [partnerLevelObj]
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.item {
  margin-top: size(20);
  background: #fff;
  font-size: size(28);
  .title {
    display: flex;
    justify-content: space-between;
    padding: size(10) size(30);
    width: 100%;
    height: size(100);
    line-height: size(100);
    .left {
      color: #9e9e9e;
    }
    // .right {
    // }
  }
  .content {
    padding: size(10) size(30);
    .content_warp {
      color: #9e9e9e;
      height: size(45);
      line-height: size(45);
      margin-bottom: size(14);
    }
    .content_main {
      line-height: size(35);
      .main_item {
        margin-top: size(10);
        color: #333;
        line-height: size(35);
        > span {
          color: #ff0a0a;
        }
      }
    }
  }
  .no {
    display: flex;
    padding: size(10) size(30);
    justify-content: space-between;
  }
}
</style>