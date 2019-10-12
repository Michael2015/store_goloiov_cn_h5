<template>
  <div class="myMsg_warp">
    <div class="warp_item">
      <img :src="userInfo.avatar" alt class="avater" />
      <div class="item_content">
        修改头像
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item" @click="tojump('/compileName')">
      <div class="item_title">名字</div>
      <div class="item_content">
        {{this.userInfo.nickname?this.userInfo.nickname:'输入'}}
        <img
          src="~img/icon/join-right.png"
          alt
        />
      </div>
    </div>
    <div class="warp_item" @click="tojump('/bingPhone')">
      <div class="item_title">手机绑定</div>
      <div class="item_content">
        {{phonehide(this.userInfo.phone)}}
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item">
      <div class="item_title">合伙人等级</div>
      <div class="item_content">{{partnerLevelObj[userInfo.partner_level]}}</div>
    </div>
    <div class="warp_item">
      <div class="item_title">我加入的团队</div>
      <div class="item_content">{{phonehide(myteamphone)}}</div>
    </div>
    <div class="warp_item" @click="tojump('/myPartner')">
      <div class="item_title">我发展的伙伴</div>
      <div class="item_content">
        {{friendNum}}人
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="warp_item" @click="tojump('/versionsMsg')">
      <div class="item_title">版本信息</div>
      <div class="item_content">
        {{versionsMsg}}
        <img src="~img/icon/join-right.png" alt />
      </div>
    </div>
    <div class="quit" @click="logout">退出登录</div>
    <confirm ref="logOut">确定退出吗？</confirm>
  </div>
</template>

<script>
import confirm from "base/confirm";
import tojump from "mixins/tojump";
import partnerLevelObj from "mixins/partner-level-obj";
import { mapState } from "vuex";
import { partnerNum } from "api/me";
export default {
  data() {
    return {
      myteamphone: "17596548795",
      friendNum: 0,
      versionsMsg: "v2.00"
    };
  },
  async mounted() {
    const reque = await partnerNum();
    this.friendNum = reque.member_nums;
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    ok() {
      console.log("退出登录");
      this.$refs.logOut.hide();
    },
    logout() {
      this.$refs.logOut.show("", () => {
        this.ok();
      });
    }
  },
  components: {
    confirm
  },
  mixins: [tojump, partnerLevelObj],
  computed: {
    ...mapState(["userInfo"])
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