<template>
  <div class="goods">
    <div class="img">
      <img :src="info.image" />
    </div>
    <router-link tag="div" :to="'/goods/' + info.id" class="info">
      <div class="top">{{ info.store_info }}</div>
      <div class="bottom">
        <span class="price">￥{{ $parent.goodsPrice }}</span>
        <span class="go">立即抢购GO <i class="iconfont">&#xe770;</i></span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { getIndexProduct } from "api";
export default {
  components: {},
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async getIndexProduct() {
      let res = await getIndexProduct();
      this.info = res || {};
      this.$store.commit("setCommonFlag", {
        id: res.id
      });
    }
  },
  mounted() {
    this.getIndexProduct();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.goods {
  height: size(180);
  background: white;
  margin: size(20) size(40);
  display: flex;
  .img {
    width: size(180);
    > img {
      width: 100%;
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: size(28);
    .top {
      font-size: size(24);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4a4a4a;
      line-height: size(34);
    }
    .bottom {
      height: size(56);
      > .price {
        font-size: size(30);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ff5500;
        line-height: size(42);
        float: left;
      }
      > .go {
        height: size(48);
        line-height: size(28);
        background: #e31336;
        border-radius: size(24);
        font-weight: 400;
        color: #ffffff;
        font-size: size(20);
        padding: size(10) size(16);
        float: right;
      }
    }
  }
}
</style>
