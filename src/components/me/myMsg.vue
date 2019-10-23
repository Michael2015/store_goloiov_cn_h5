<template>
  <div class="myMsg_warp">
    <top-head>个人信息</top-head>
    <div>
      <div class="warp_item border-bottom">
        <img :src="userInfo.avatar" alt class="avater" />
        <div class="item_content">
          <label for="image">
            修改头像
            <img src="~img/icon/join-right.png" alt />
            <update-avatar
              :max="max"
              v-model="newAvatar"
              style="width:0;height:0;overflow:hidden"
              ref="img"
            ></update-avatar>
          </label>
        </div>
      </div>
      <div class="warp_item border-bottom" @click="tojump('/compileName')">
        <div class="item_title">名字</div>
        <div class="item_content">
          {{this.userInfo.nickname?this.userInfo.nickname:'输入'}}
          <img
            src="~img/icon/join-right.png"
            alt
          />
        </div>
      </div>
      <div class="warp_item border-bottom" @click="tojump('/bingPhone')">
        <div class="item_title">手机绑定</div>
        <div class="item_content">
          {{this.userInfo.phone?phonehide(this.userInfo.phone):''}}
          <img
            src="~img/icon/join-right.png"
            alt
          />
        </div>
      </div>
      <div class="warp_item border-bottom">
        <div class="item_title">合伙人等级</div>
        <div class="item_content">{{partnerLevelObj[userInfo.partner_level]}}</div>
      </div>
      <div class="warp_item border-bottom">
        <div class="item_title">我加入的团队</div>
        <div class="item_content" @click="toAddTeam">
          {{is_band_partner === 1?spread_user:'可添加'}}
          <img
            v-if="is_band_partner === 1"
            @click="openPhone"
            class="openPhone"
            src="~img/me/contact.png"
            alt
          />
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
      <div class="warp_item border-bottom" @click="tojump('/myPartner')">
        <div class="item_title">我发展的伙伴</div>
        <div class="item_content">
          {{friendNum}}人
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
      <div class="warp_item border-bottom" @click="tojump('/versionsMsg')">
        <div class="item_title">版本信息</div>
        <div class="item_content">
          {{versionsMsg}}
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
    </div>
    <!-- <div class="quit" @click="logout">退出登录</div>
    <confirm ref="logOut">确定退出吗？</confirm> -->
    <notice ref="notice"></notice>
    <addteam ref="addteam"></addteam>
  </div>
</template>

<script>
// import confirm from "base/confirm"
import notice from 'base/notice'
import tojump from "mixins/tojump"
import partnerLevelObj from "mixins/partner-level-obj"
import { mapState } from "vuex"
import { partnerNum, edituserinfo,updateUserInfo } from "api/me"
import addteam from "base/addteam"
import updateAvatar from "com/common/updateAvatar"
import { Toast } from 'lib'
import {logout} from 'api/login'
import {telephone} from 'api/native'
export default {
  data() {
    return {
      friendNum: 0,
      versionsMsg: "v2.00",
      is_band_partner: 0, //标识是否有上级合伙人
      spread_user_nickname: "", //上级合伙人名称
      spread_user_phone: "", // 上级合伙人电话
      max: 1,
      newAvatar: [] //选择的新头像
    };
  },
  mounted() {
    this.loadDate();
    updateUserInfo();
    // this.$refs.addteam.show(this.loadDate);
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    logout() {
      this.$refs.logOut.show("", () => {
        logout().then(() => {
          this.$refs.notice.show("退出成功", () => {
            this.$router.replace("/");
          });
        });
      });
    },
    openPhone() {
      // 原生打电话
      telephone(this.spread_user_phone)
    },
    toAddTeam() {
      if (this.is_band_partner === 1) {
        return;
      }
      // this.$refs.addteam.show(this.loadDate);
      this.$router.push('/join-partner')
    },
    async loadDate() {
      const reque = await partnerNum();
      console.log(reque);
      this.friendNum = reque.member_nums;
      this.is_band_partner = reque.is_band_partner;
      this.spread_user_nickname = reque.spread_user_nickname;
      this.spread_user_phone = reque.spread_user_phone;
    }
  },
  components: {
    // confirm,
    addteam,
    updateAvatar,
    notice
  },
  mixins: [tojump, partnerLevelObj],
  computed: {
    ...mapState(["userInfo"]),
    spread_user() {
      return (
        this.spread_user_nickname + " " + this.phonehide(this.spread_user_phone)
      );
    }
  },
  watch: {
    newAvatar(val) {
      if (val.length === 0) {
        return;
      }
      edituserinfo({ headImg: val[0] }).then(res => {
        if (res.code === 200) {
          Toast(res.msg);
          updateUserInfo();
        } else {
          Toast(res.msg);
          this.$refs.img.imgs = [];
          this.newAvatar = [];
        }
      });
    }
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
    background: #fff;
    padding-right: size(30);
    padding-left: size(36);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:nth-child(1) {
      height: size(138);
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
    }
    .item_title {
      color: #333333;
    }
    .item_content {
      color: #999999;
      & > img {
        vertical-align: unset;
        width: size(16);
        margin-left: size(12);
      }
      label {
        & > img {
          vertical-align: unset;
          width: size(16);
          margin-left: size(12);
        }
      }
      .openPhone {
        width: size(44);
        height: size(44);
        margin-left: size(0);
        vertical-align: text-bottom;
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