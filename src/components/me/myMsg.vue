<template>
  <div class="myMsg_warp">
    <div class="warp_item">
      <img :src="avater" alt class="avater" />
      <div class="item_content">
        修改头像
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item">
      <div class="item_title">名字</div>
      <div class="item_content">
        {{name}}
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item">
      <div class="item_title">手机绑定</div>
      <div class="item_content">
        {{phonehide(phone)}}
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item">
      <div class="item_title">合伙人等级</div>
      <div class="item_content">{{lever}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">我加入的团队</div>
      <div class="item_content">{{phonehide(myteamphone)}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">我发展的伙伴</div>
      <div class="item_content">
        {{friendNum}}人
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item">
      <div class="item_title">版本信息</div>
      <div class="item_content">
        {{versionsMsg}}
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="quit" @click="$refs.logOut.show()">退出登录</div>
    <confirm ref="logOut" @ok="ok">确定退出吗？</confirm>
  </div>
</template>

<script>
import confirm from "base/confirm";
export default {
  data() {
    return {
      avater:
        "https://wx.qlogo.cn/mmopen/vi_32/bYDM1OWAZ92xNWTAiadjrrIBLIwalWdvYx6t7PN36gkSMP3UDsa0LD8dibwfdEudKHQmnj41BJksnIqmYRmj5yoA/132",
      name: "输入   ",
      lever: "一般合伙人",
      myteamphone: "17596548795",
      friendNum: 0,
      phone: "15347407062",
      versionsMsg: "v2.00"
    };
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    ok() {
      console.log("退出登录");
      this.$refs.logOut.hide();
    }
  },
  components: {
    confirm
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.myMsg_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: size(30);
  .warp_item {
    height: size(100);
    line-height: size(100);
    background: #fff;
    padding-right: size(30);
    padding-left: size(36);
    display: flex;
    justify-content: space-between;
    &:nth-child(1) {
      height: size(138);
      line-height: size(138);
      padding-left: size(20);
    }
    &:nth-child(4) {
      margin-top: size(20);
    }
    &:nth-child(7) {
      margin-top: size(20);
    }
    & > img {
      width: size(100);
      height: size(100);
      border-radius: 50%;
      margin: auto 0 auto 0;
    }
    .item_title {
      color: #333333;
    }
    .item_content {
      color: #999999;
      & > img {
        vertical-align: unset;
        width: size(10);
        height: size(22);
        margin-left: size(28);
      }
    }
  }
  .quit {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    text-align: center;
    background: #fff;
    color: #333333;
  }
}
</style>