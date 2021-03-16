<template>
  <div class="wrap">
    <top-head :transparent="true">
      <!-- <div class="share" slot="right" @click="createPoster" v-if="isLogin">
        <img src="~img/icon/share.png" alt />
      </div> -->
    </top-head>
    <goods-banner :imgs="info.slider_image"></goods-banner>
    <div class="intro-wrap">
      <div class="goods-name">{{ info.store_info }}</div>
      <div class="price-num">
        <span class="price">
          <span>¥{{ product_price }}</span>
        </span>
      </div>
      <div class="tip">{{ info.attach_product }}</div>
      <div class="free-intro table" v-if="info.is_platoon === 1">
        <div class="icon-wrap">
          <img src="~img/icon/tips.png" alt />
        </div>
      </div>
    </div>
    <div class="navs border-bottom">
      <router-link tag="span" to="detail" replace>产品详情</router-link>
      <router-link tag="span" to="buy-records" replace>购买记录</router-link>
      <router-link tag="span" to="visitor" replace>收益排行</router-link>
      <router-link tag="span" to="comment" replace>股东排名</router-link>
    </div>
    <div style="padding-bottom:60px;">
      <keep-alive>
        <router-view :id="id" :goodsName="info.store_name"></router-view>
      </keep-alive>
    </div>
    <div class="action-bar table border-top" @click="buy">
      立即购买
    </div>
    <notice ref="notice" :autoClose="true"></notice>
    <!-- 免单奖励介绍 -->
    <free-intro ref="showFreeIntro" :info="info"></free-intro>
  </div>
</template>

<script>
import GoodsBanner from "./goods-banner";
import FreeIntro from "base/free-intro";
import Notice from "base/notice";
import { Loading, Toast, getFloat } from "lib";
import { getIndexProductDetail, getQrcode } from "api";
import { mapState, mapMutations } from "vuex";
import { login } from "api/login";
import { sharePoster } from "api/native";
import Poster from "lib/poster";
import { getProductPrice } from "api/index";

// 海报上的图片
const tips = require("img/blessing.png");

export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  components: {
    GoodsBanner,
    FreeIntro,
    Notice
  },
  data() {
    return {
      // 商品的基本信息，价格，图片啊
      info: {
        newbornzone: {}
      },
      isFirst: true,
      product_price: ""
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"])
  },
  created() {
    Loading.open();
    Promise.all([
      getIndexProductDetail(this.id).then(data => {
        if (data) {
          this.info = data;
          this.info.slider_image = JSON.parse(data.slider_image);
        }
      }),
      this.getProductPrice(this.id)
    ]).then(() => {
      Loading.close();
    });
  },
  mounted() {
    // this.$refs.setNum.show(this.info);
  },
  methods: {
    ...mapMutations(["setBuyTotalNum"]),
    getProductPrice(id) {
      getProductPrice({
        product_id: id
      }).then(({ product_price }) => {
        this.product_price = product_price;
      });
    },
    goIndex() {
      this.$router.push("/index");
    },
    createPoster() {
      if (this.poster) {
        sharePoster(this.poster.base64);
        return;
      }
      Loading.open();
      this.poster = new Poster(this.info.store_name);
      Promise.all([
        this.poster.drawGoods(this.info.slider_image[0]),
        this.poster.drawTips(tips),
        getQrcode(
          [this.userInfo.uid, this.userInfo.uid, this.id].join(",")
        ).then(data => {
          if (data) {
            return this.poster.drawQrcode(data);
          } else {
            return Promise.reject("获取二维码失败");
          }
        })
      ])
        .then(
          () => {
            console.log(this.poster.getBase64());
            this.poster.base64 = this.poster
              .getBase64()
              .replace("data:image/png;base64,", "");
            sharePoster(this.poster.base64);
          },
          () => {
            this.poster = null;
          }
        )
        .finally(() => {
          Loading.close();
        });
    },
    buy() {
      // 购买商品
      if (!this.isLogin) {
        // 没有登录
        this.$notice.show("请先登录", () => {
          login()
            .then(
              () => {
                // 登录成功了
              },
              () => {
                this.$refs.notice.show("登录失败，请稍后再试");
              }
            )
            .finally(() => {
              // 最后
            });
        });
        return;
      }
      this.$router.push({
        name: "buy-goods",
        params: {
          id: this.id,
          info: this.info
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
}
.share {
  text-align: right;
  img {
    width: size(34);
    display: inline-block;
  }
  padding: size(6) 0;
  padding-right: size(12);
  padding-left: size(18);
}

.intro-wrap {
  padding: 0 size(30) size(40);
  background: #fff;
  padding-top: size(20);
  .price-num {
    line-height: size(66);
    .price {
      color: #333333;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      font-size: size(36);
      > span {
        font-size: size(48);
        color: #fe0000;
      }
      > em {
        color: #999;
        font-size: size(30);
        text-decoration: line-through;
        font-style: normal;
      }
    }
    .news {
      display: inline-block;
      color: #ffffff;
      background: red;
      height: size(40);
      line-height: size(40);
      padding: 0 size(10);
      margin-left: size(20);
      font-size: size(28);
    }
  }
  .tip {
    font-size: size(20);
    font-weight: 400;
    color: #999999;
    line-height: size(40);
    text-align: right;
  }
  .price-cut {
    font-size: size(26);
  }
  .num {
    float: right;
    font-size: size(24);
    color: #555;
    position: relative;
    top: size(12);
  }
  .goods-name {
    font-size: size(30);
    color: #303030;
    line-height: size(52);
    @include txt-overflow(2);
    font-weight: 800;
    margin: size(20) 0;
  }
  .free-intro {
    height: size(78);
    background-color: #f7f7f7;
    border: solid 1px #f0f0f0;
    padding: 0 size(16);
    font-size: size(24);
    color: #7c7b7b;
    line-height: 1.4;
    > div {
      display: table-cell;
      vertical-align: middle;
    }

    .icon-wrap {
      width: size(48);
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
.navs {
  text-align: center;
  font-size: 0;
  background: #fff;
  margin-top: size(20);
  display: flex;
  justify-content: space-around;
  > span {
    display: inline-block;
    font-size: size(30);
    color: #666;
    padding: size(0) size(30);
    line-height: size(96);
    font-weight: 800;
    position: relative;
    &.router-link-active {
      color: #333;
      color: $color-main;
    }
  }
}
.action-bar {
  position: fixed;
  z-index: 9;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: size(100);
  background-image: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
  font-size: size(30);
  color: #fff;
  text-align: center;
  line-height: size(100);
}
</style>
