<template>
  <div class="my_partner_warp">
    <top-head>我的伙伴</top-head>
    <div class="header">
      <div class="left">
        <img :src="userInfo.avatar" alt />
        我的合伙人
      </div>
      <div class="right">{{reque.member_nums}}人</div>
    </div>
    <div class="content">
      <div class="search">
        <img src="~img/sousuo.png" alt />
        <input type="text" placeholder="搜索" v-model="value" @input="getdata" />
      </div>
      <div class="partner_list">
        <div class="item" v-for="(item) in reque.list" :key="item.uid">
          <img :src="item.avatar" alt />
          <div class="name">{{item.nickname}}</div>
          <div class="show_count" v-if="item.lower_nums !== 0">{{item.lower_nums}}</div>
        </div>
      </div>
    </div>
    <div class="invite_btn" @click="invite">邀请合伙人</div>
  </div>
</template>

<script>
import { member } from "api/me";
import { mapState } from "vuex";
import {invitePartner} from 'api/native'
export default {
  data() {
    return {
      reque: {},
      value: ""
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    async getdata() {
      this.reque = await member(this.value);
    },
    invite() {
      invitePartner(this.userInfo.uid, this.userInfo.nickname)
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.my_partner_warp {
  width: 100%;
  height: 100%;
  // background: #f5f5f5;
  .header {
    height: size(106);
    line-height: size(106);
    background: #fff;
    padding: 0 size(30);
    display: flex;
    justify-content: space-between;
    .left {
      font-size: size(30);
      color: #333333;
      & > img {
        width: size(60);
        height: size(60);
        border-radius: 50%;
        margin-right: size(18);
        vertical-align: middle;
      }
    }
    .right {
      font-size: size(26);
      color: #000;
    }
  }
  .content {
    margin-top: size(2);
    background: #fff;
    padding: size(32) size(30) size(100) size(30);
    overflow: auto;
    .search {
      height: size(64);
      background-color: #f5f5f5;
      border-radius: size(32);
      display: flex;
      align-items: center;
      & > img {
        width: size(32);
        height: size(32);
        margin-left: size(20);
        margin-right: size(14);
      }
      & > input {
        font-size: size(28);
        border-radius: size(32);
        background: #f5f5f5;
        line-height: normal;
        &::-webkit-input-placeholder {
          color: #9ea2a0;
        }
      }
    }
    .partner_list {
      padding: size(49) size(15) 0 size(15);
      display: flex;
      flex-wrap: wrap;
      .item {
        width: size(100);
        height: size(141);
        margin-right: size(40);
        margin-top: size(25);
        position: relative;
        &:nth-child(5n) {
          margin-right: 0;
        }
        & > img {
          width: 100%;
          height: size(100);
          border-radius: size(8);
        }
        .name {
          font-size: size(24);
          color: #4e4e4e;
          width: size(96);
          margin-left: size(2);
          text-align: center;
          margin-top: size(8);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .show_count {
          position: absolute;
          right: size(-17);
          top: size(-13);
          box-sizing: border-box;
          width: size(48);
          height: size(48);
          line-height: size(48);
          border-radius: 50%;
          border: size(4) solid #fff;
          background: #fc4747;
          color: #fff;
          font-size: size(26);
          text-align: center;
        }
      }
    }
  }
  .invite_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    background: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
    font-size: sizes(30);
    letter-spacing: size(1);
    color: #ffffff;
    text-align: center;
  }
}
</style>