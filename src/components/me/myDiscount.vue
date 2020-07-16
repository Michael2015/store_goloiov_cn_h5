<template>
  <div class="discount_warp">
    <top-head>优惠券</top-head>
    <div class="main">
      <div class="item" v-for="(item,index) in couponList" :key="index">
        <!-- 左侧 -->
        <div class="left">
          <div class="t1">￥</div>
          <div class="t2">{{item.coupon_price}}</div>
        </div>
        <div class="zhon">
          <div class="title">{{item.coupon_title}}</div>
          <div class="endtime">有效期至：{{item.end_time}}</div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <div :class="item.status !== 0?'clickbtn no':'clickbtn'">
            <span v-if="item.status == -1" class="used" @click="touse(item.with_products)">未开始</span>
            <span v-else-if="item.status == 0" @click="touse(item.jump_url)">立即使用</span>
            <span v-else-if="item.status == 1" class="used">已使用</span>
            <span v-else-if="item.status == 2" class="used">已过期</span>
          </div>
        </div>
        <i></i>
      </div>
      <div class="no-data">{{couponList.length === 0?'暂无数据':''}}</div>
    </div>
  </div>
</template>

<script>
import { getcouponlist } from "api/me";
import { Loading } from "lib";
import tojump from "mixins/tojump";
export default {
  data() {
    return {
      couponList: []
    };
  },
  async mounted() {
    Loading.open();
    const reque = await getcouponlist();
    Loading.close();
    this.couponList = reque;
    console.log(reque);
  },
  mixins: [tojump],
  methods: {
    touse(url) {
      this.tojump(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.discount_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow: hidden;
  .main {
    overflow: auto;
    height: 100%;
    .item {
      width: size(690);
      height: size(200);
      background-color: #ffffff;
      border-radius: size(22);
      margin: size(22) auto 0 auto;
      display: flex;
      .left {
        display: flex;
        color: #ff6c00;
        line-height: size(200);
        margin-left: size(10);
        margin-right: size(40);
        .t1 {
          line-height: size(210);
          margin-right: size(10);
        }
        .t2 {
          font-size: size(54);
        }
      }
      .zhon {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: size(26);
          color: #444444;
        }
        .endtime {
          margin-top: size(12);
          font-size: size(24);
          color: #666666;
        }
      }
      .right {
        .clickbtn {
          margin: size(73) size(38) size(73) size(82);
          width: size(132);
          height: size(54);
          background: linear-gradient(42deg, #ff8540 0%, #ff594c 100%);
          border-radius: size(27);
          font-size: size(20);
          color: #fff;
          line-height: size(54);
          text-align: center;
          &.no {
            background: #e6e6e6;
          }
          .used {
            & {
              color: #999;
            }
          }
        }
      }
    }
    .no-data {
      margin-top: size(30);
      font-size: size(26);
      color: #444444;
      text-align: center;
    }
  }
}
</style>