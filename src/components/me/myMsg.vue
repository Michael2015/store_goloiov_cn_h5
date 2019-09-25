<template>
  <div class="myMsg_warp">
    <div class="warp_item">
      <div class="item_title avatar-title">头像</div>
      <img :src='avater' alt='' class="avater" />
    </div>
    <div class="warp_item">
      <div class="item_title">名字</div>
      <div class="item_content">{{name}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">合伙人等级</div>
      <div class="item_content">{{lever}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">我加入的团队</div>
      <div class="item_content">{{myteam}} {{phonehide(myteamphone)}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">我发展的伙伴</div>
      <div class="item_content">{{friendNum}}人 ></div>
    </div>
    <div class="warp_item">
      <div class="item_title">手机绑定</div>
      <div class="item_content">{{phonehide(phone)}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">版本信息</div>
      <div class="item_content">{{versionsMsg}} ></div>
    </div>
    <div class="quit">退出登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avater: "https://wx.qlogo.cn/mmopen/vi_32/bYDM1OWAZ92xNWTAiadjrrIBLIwalWdvYx6t7PN36gkSMP3UDsa0LD8dibwfdEudKHQmnj41BJksnIqmYRmj5yoA/132",
      name: "404",
      lever: "一般合伙人",
      myteam: "少年闰土",
      myteamphone:'17596548795',
      friendNum: 0,
      phone: "15347407062",
      versionsMsg: "v1.0.1"
    };
  },
  methods:{
      phonehide(phone){
          return phone.substring(0,3) + '****' + phone.substring(7)
      }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.myMsg_warp {
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  .warp_item {
    padding: size(30);
    box-shadow: 0 size(-1) 0 0 rgba(221, 221, 221, 1);
    display: flex;
    justify-content: space-between;
    font-size: size(28);
    background: #fff;
  }
  .avater{
    @include circle(68)
  }
  .avatar-title{
      line-height: size(68);
  }
  .item_title {
    color: #000;
  }
  .item_content {
    color: #888888;
    padding: 0;
  }
  .quit{
      color: #fff;
      background: #e70002;
      margin: size(20) size(20) 0;
      height: size(80);
      line-height: size(80);
      text-align: center;
      border-radius: size(12)
  }
}
</style>