<template>
  <div class="me_warp">
    <div class="header">
      <div class="avater_warp">
        <img
          class="averer"
          src="https://wx.qlogo.cn/mmopen/vi_32/bYDM1OWAZ92xNWTAiadjrrIBLIwalWdvYx6t7PN36gkSMP3UDsa0LD8dibwfdEudKHQmnj41BJksnIqmYRmj5yoA/132"
          alt
        />
        <div class="amend" @click="tojump('/myMsg')">
          <img src="~img/me/bianji.png" alt />
        </div>
      </div>
      <div class="user_name">404</div>
      <div class="grade">一般合伙人</div>
      <div class="team_no">伙伴14人</div>
    </div>
    <div class="crosswise_tab">
      <div class="crosswise_item" @click="tojump('/myVisitor')">
        <img src="~img/me/fangkexiaoxi.png" alt />
        <div class="title">访客记录</div>
      </div>
      <div class="gang"></div>
      <div class="crosswise_item" @click="tojump('/myPartner')">
        <img src="~img/me/wodehuoban.png" alt />
        <div class="title">我的伙伴</div>
      </div>
    </div>
    <div class="vertical_tab">
      <div class="vertical_item" v-for="(item,index) in tabList" :key="index">
        <router-link tag="div" class="left" :to="item.path?item.path:''">
          <img :src="item.img" alt />
          <div class="title">{{item.tit}}</div>
        </router-link>
        <div class="right">
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tojump from 'mixins/tojump'

export default {
  data() {
    return {
      tabList: [
        { img: require("img/me/icon1.png"), tit: "我的优惠券" },
        { img: require("img/me/icon2.png"), tit: "收货地址", path: '/myAddress' },
        { img: require("img/me/icon3.png"), tit: "我的评论" },
        { img: require("img/me/icon4.png"), tit: "升级攻略" },
        { img: require("img/me/icon5.png"), tit: "商城使用说明" },
        { img: require("img/me/icon6.png"), tit: "反馈意见" }
      ]
    };
  },
  mixins:[tojump]
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.me_warp {
  padding-bottom: size(100);
  .header {
    height: size(385);
    overflow: hidden;
    position: relative;
    .avater_warp {
      margin: size(36) auto size(28) auto;
      box-sizing: border-box;
      width: size(169);
      height: size(169);
      border: size(2) solid #0c0422;
      border-radius: 50%;
      padding: size(10);
      position: relative;
      & > img {
        width: size(148);
        height: size(148);
        border-radius: 50%;
      }
      .amend {
        position: absolute;
        right: size(2);
        bottom: size(4);
        width: size(44);
        height: size(44);
        border-radius: 50%;
        background: #fff;
        padding: size(4);
        & > img {
          width: size(36);
          height: size(36);
          border-radius: 50%;
        }
      }
    }
    .user_name {
      height: size(63);
      line-height: size(63);
      font-size: size(46);
      color: #0c0423;
      text-align: center;
    }
    .grade {
      margin: size(8) auto 0 auto;
      width: size(158);
      height: size(43);
      line-height: size(43);
      text-align: center;
      background-color: #000000;
      color: #fff;
      font-size: size(24);
      border-radius: size(6);
    }
    .team_no {
      height: size(37);
      line-height: size(37);
      font-size: size(26);
      color: #727076;
      position: absolute;
      right: size(30);
      bottom: size(9);
    }
  }
  .crosswise_tab {
    box-sizing: border-box;
    height: size(162);
    border-top: size(2) solid #eaeaea;
    border-bottom: size(2) solid #eaeaea;
    display: flex;
    .gang {
      width: size(4);
      height: size(52);
      background-color: #e5e5e5;
      margin: auto 0;
    }
    .crosswise_item {
      flex: 1;
      color: #000000;
      font-size: size(24);
      display: flex;
      flex-direction: column;
      align-items: center;
      & > img {
        width: size(64);
        height: size(64);
        margin-top: size(45);
        margin-bottom: size(2);
      }
      .title {
        text-align: center;
      }
    }
  }
  .vertical_tab {
    padding: 0 size(45);
    .vertical_item {
      height: size(122);
      line-height: size(122);
      border-bottom: size(2) solid #f5f5f5;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        & > img {
          width: size(36);
          height: size(36);
          margin: auto size(30) auto 0;
        }
        .title {
          flex: 1;
          font-size: size(28);
          color: #0c0422;
        }
      }
      .right {
        & > img {
          width: size(12);
          height: size(22);
        }
      }
    }
  }
}
</style>