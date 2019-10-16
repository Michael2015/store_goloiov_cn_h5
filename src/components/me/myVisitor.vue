<template>
  <div class="myVisitor_warp">
    <top-head>访客记录</top-head>
    <load-more v-slot="{list}" :setSize='11' :getData="loadDate">
      <div class="item" v-for="(item,index) in list" :key="index">
        <img :src="item.avatar" alt />
        <div class="desc">
          <div class="name">{{item.nickname}}</div>
          <div class="describe">{{item.status===0?'看了':'买了'}}：{{item.product_name}}</div>
        </div>
        <div class="time">{{item.update_time}}</div>
      </div>
    </load-more>
  </div>
</template>

<script>
import { lowerBrowsing } from "api/me";
import loadMore from "base/load-more";
export default {
  components: {
    loadMore
  },
  methods: {
    loadDate(page, size) {
      return lowerBrowsing(page, size);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.myVisitor_warp {
  padding: 0 size(30) size(20) size(30);
  .item {
    height: size(108);
    background-color: #f8f8f8;
    border-radius: size(80);
    display: flex;
    margin-top: size(20);
    & > img {
      width: size(80);
      height: size(80);
      border-radius: 50%;
      margin: size(14) size(26) size(14) size(14);
    }
    .desc {
      flex: 1;
      .name {
        font-size: size(28);
        color: #333333;
        height: size(40);
        line-height: size(40);
        margin-top: size(18);
      }
      .describe {
        max-width: size(387);
        font-size: size(24);
        color: #999999;
        height: size(33);
        line-height: size(33);
        margin-top: size(4);
        @include txt-overflow();
      }
    }
    .time {
      width: size(183);
      line-height: size(108);
      font-size: size(24);
      color: #666666;
      padding-left: size(42);
    }
  }
}
</style>