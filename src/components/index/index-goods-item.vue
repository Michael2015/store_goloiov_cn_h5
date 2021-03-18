<template>
  <div class="goods">
    <div class="img">
      <img :src="info.image" />
    </div>
    <router-link tag="div"
                 :to="'/goods/' + info.id"
                 class="info">
      <div class="top">{{ info.store_info }}</div>
      <div class="center"><span>1件({{info.product_attr}} * 12)</span></div>
      <div class="bottom">
        <div class="bot">
          <div class="price">￥{{remainPoint(formatFloat($parent.goodsPrice,info.sku_num||0,'*'),2)}}</div>
          <div class="cur-price">￥{{ remainPoint($parent.goodsPrice,2) }}/支</div>
        </div>
        <div class="go"><span>立即抢GO</span><i class="iconfont">&#xe770;</i></div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { getIndexProduct } from "api";
import { formatFloat, remainPoint } from 'lib'
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
  computed: {
    formatFloat() {
      return formatFloat
    },
    remainPoint() {
      return remainPoint
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
  background: white;
  height: size(220);
  background: white;
  margin: size(20) 0;
  padding: size(20);
  border-radius: size(16);
  display: flex;
  .img {
    width: size(180);
    height: size(180);
    > img {
      width: 100%;
      height: 100%;
      border-radius: size(16);
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: size(28);
    .top {
      @include txt-overflow(2);
      font-size: size(26);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: size(32);
    }
    .center {
      > span {
        border-radius: size(4);
        opacity: 0.7;
        font-size: size(20);
        color: #fc976f;
        border: 1px solid #fc976f;
        padding: size(4);
        white-space: nowrap;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: size(50);
      > .bot {
        height: 100%;
        .price {
          font-size: size(32);
          font-weight: 600;
          color: #fb5555;
          line-height: size(37);
          float: left;
          line-height: size(50);
          margin-right: size(10);
        }
        .cur-price {
          height: size(40);
          line-height: size(40);
          background: #ff5061;
          border-radius: 0 size(20) size(20) size(20);
          float: left;
          color: #ffdbd6;
          padding: 0 size(5);
          font-size: size(22);
          margin-top: size(4);
        }
      }
      > .go {
        line-height: size(50);
        background: linear-gradient(132deg, #f95384 0%, #e31336 100%);
        border-radius: size(25);
        float: right;
        color: white;
        font-size: size(24);
        padding: 0 size(10);
        .iconfont {
          font-size: size(24);
        }
      }
    }
  }
}
</style>
