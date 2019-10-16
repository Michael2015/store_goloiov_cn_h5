<template>
  <div class="list">
    <top-head>我的评论</top-head>
    <div class="item" v-for="(item,index) in list" :key="index">
      <div class="head table">
        <div class="avatar">
          <img :src="item.avatar" alt />
        </div>
        <div class="name">
          <div>{{item.nickname}}</div>
        </div>
        <div class="star" v-if="item.star_num">
          <div>
            <span v-for="s in item.star_num" :key="s"></span>
          </div>
        </div>
      </div>
      <div class="text">{{item.comment}}</div>
      <div class="imgs" v-if="item.pics">
        <div v-for="(i,ii) in item.pics" :key="ii">
          <div>
            <img :src="i" alt />
          </div>
        </div>
      </div>
      <div class="time">{{item.add_time}}</div>
    </div>
  </div>
</template>

<script>
import { commentRecord } from "api/me";
import { Loading } from "lib";
export default {
  components: {},
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    Loading.open();
    const reque = await commentRecord();
    Loading.close();
    this.list = reque;
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.list {
  background-color: $color-body-bg;
}
.item {
  margin-bottom: size(20);
  padding: size(30) size(30) size(36);
  background: #fff;
}
.head {
  height: size(80);
  > div {
    display: table-cell;
    vertical-align: middle;
  }
  .avatar {
    width: size(80);
    img {
      display: block;
      width: 100%;
      height: size(80);
      border-radius: 50%;
    }
  }
  .name {
    padding-left: size(20);
    font-size: size(30);
    > div {
      @include txt-overflow;
    }
  }
  .star {
    width: size(188);
    text-align: right;
    font-size: 0;
    span {
      display: inline-block;
      width: size(30);
      height: size(30);
      margin-right: 2px;
      @include bg("~img/icon/star.png");
    }
  }
}
.text {
  margin: size(22) 0;
  font-size: size(26);
  line-height: 1.6;
}
.imgs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    width: 31%;
    > div {
      padding-bottom: 100%;
      position: relative;
      background: #eee;
      margin-bottom: size(20);
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.time {
  font-size: size(24);
  color: #999;
  line-height: size(32);
  margin-top: size(38);
}
</style>