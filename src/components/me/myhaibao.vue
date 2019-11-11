<template>
  <div class="post-list">
    <top-head>海报列表</top-head>
    <div class="item" v-for="(item,index) in list" :key="index" @click="jump(item.img_url,item.name)">
      <img :src="item.img_url" class="icon" />
      <div class="middle">
        <div class="title">{{item.name}}</div>
        <div class="time">{{item.add_time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getposterlist } from "api/me";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    jump(url,name) {
      this.$router.push(`/haibaoDetali?url=${url}&name=${name}`);
    }
  },
  mounted() {
    getposterlist().then(res => {
      this.list = res;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.post-list {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .item {
    margin-top: size(10);
    height: size(174);
    background: #ffffff;
    box-sizing: border-box;
    padding: size(27) size(30);
    display: flex;
    > img {
      width: size(120);
      height: size(120);
      background-color: #d8d8d8;
      border-radius: size(5);
      margin-right: size(16);
    }
    .middle {
      flex: 1;
      .title {
        width: 100%;
        font-size: size(32);
        line-height: size(39);
        letter-spacing: size(1);
        color: #333333;
        @include txt-overflow();
      }
      .time {
        font-size: size(24);
        color: #333333;
        margin-top: size(21);
      }
    }
  }
}
</style>