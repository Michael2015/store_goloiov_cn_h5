<template>
  <div class="view">
    <top-head>贡献值详情</top-head>
    <div class="contribution_list">
      <legend>
        累计贡献值
        <img src="~img/me/contribution_task_icon.png" />
      </legend>
      <load-more v-slot="{list}" :setSize='10' :getData="loadDate">
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="top">{{item.title}}</div>
          <div class="bottom">{{item.finish_time}}</div>
        </div>
        <div class="right">+{{item.amount}}</div>
      </div>
    </load-more>
    </div>
  </div>
</template>
<script>
import { getUserContributionList } from "api/me";
import loadMore from "base/load-more";
export default {
   components: {
    loadMore
  },
  data() {
    return {
      list: [],
      useable_integral: 0
    };
  },
  methods: {
    loadDate(page, size) {
      return getUserContributionList(page, size);
    }
  }
};
</script>s
<style lang="scss" scoped>
@import "~css/def";
.view {
  width: 94%;
  margin: 0 auto;
}
.contribution_list {
  > legend {
    height: size(150);
    line-height: size(150);
    font-size: size(40);
    padding-left: size(40);
    > img {
      height: size(32);
      margin-left: size(15);
    }
  }
  .list {
    padding: size(40);
    border-bottom: size(1) solid #eee;
    > .left {
      float: left;
      > div {
        height: size(50);
        line-height: size(50);
        &.top {
          font-size: size(35);
          font-weight: bold;
        }
        &.bottom {
          font-size: size(25);
          color: #999;
        }
      }
    }
    > .right {
      float: right;
      height: size(100);
      line-height: size(100);
      color: #e60000;
    }
  }
  .list::after,.left::after {
      content: "";
      clear: both;
      display: block;
      overflow: hidden;
  }
}
</style>