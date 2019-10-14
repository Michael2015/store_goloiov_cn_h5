<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="form-model" v-if="!findTeam">
          <div class="title-warp">请输入11位手机号</div>
          <div class="input-warp">
            <input class="phone-input" v-model="inputPhone" maxlength="11" />
          </div>
          <div class="button-warp">
            <div :class="hefaPhone?'tabMask':'disabled'" @click="next">下一步</div>
          </div>
        </div>
        <div class="confirm-model" v-if="findTeam">
          <div class="confirm-title">是否确定加入{{addteamName}}的团队？</div>
          <div class="button-warp">
            <div class="ChoiceBut no" @click="no">否</div>
            <div class="ChoiceBut yes" @click="yes">是</div>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popup from "ui/popup";
import { searchPartner, joinTeam, updateUserInfo } from "api/me";
import { Toast } from "lib";
export default {
  data() {
    return {
      callBack: null,
      findTeam: false,
      inputPhone: "",
      addteamId: 0,
      addteamName: ""
    };
  },
  components: {
    popup
  },
  mixins: [showHide],
  methods: {
    show(callBack) {
      this.isShow = true;
      console.log("neibu");
      this.callBack = callBack;
    },
    async next() {
      if (!this.hefaPhone) {
        return;
      }
      const res = await searchPartner({ phone: this.inputPhone });
      if (res.code === 400) {
        Toast(res.msg);
        return;
      }
      if (res.code === 200) {
        this.addteamId = res.data.uid;
        this.addteamName = res.data.nickname;
        this.findTeam = true;
      }
    },
    no() {
      this.findTeam = false;
      this.addteamName = "";
      this.addteamId = 0;
      this.inputPhone = "";
    },
    async yes() {
      const res = await joinTeam({ spid: this.addteamId });
      if (res.code === 400) {
        Toast(res.msg);
        return;
      } else if (res.code === 200) {
        Toast("加入成功");
        this.callBack().then(() => {
          updateUserInfo().then(() => {
            this.hide();
          });
        });
      }
    }
  },
  computed: {
    hefaPhone() {
      return !(this.inputPhone.length === 0 || this.inputPhone.length !== 11);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  width: size(630);
  height: size(330);
  padding: size(31) size(53);
  box-sizing: border-box;
  background: white;
  border-radius: size(20);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .form-model {
    width: 100%;
    height: 100%;
    .title-warp {
      color: #999;
      font-size: size(29);
      text-align: center;
    }
    .input-warp {
      border-bottom: size(1) solid #999;
      height: size(100);
      position: relative;
      .phone-input {
        width: 80%;
        height: size(50);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: size(33);
        text-align: center;
        outline: none;
      }
    }
    .button-warp {
      display: flex;
      margin-top: size(36);
      .tabMask {
        width: 100%;
        height: size(80);
        line-height: size(80);
        background: #e60000;
        border-radius: size(12);
        color: #ffffff;
        font-size: size(30);
        text-align: center;
      }
      .disabled {
        width: 100%;
        height: size(80);
        line-height: size(80);
        border-radius: size(12);
        font-size: size(30);
        text-align: center;
        color: #ffffff;
        background-color: #dddddd;
      }
    }
  }
  .confirm-model {
    width: 100%;
    height: 100%;
    .confirm-title {
      font-size: size(30);
      color: #333333;
      width: 100%;
      text-align: center;
      margin-top: size(60);
    }
    .button-warp {
      display: flex;
      margin-top: size(88);
      justify-content: space-between;
      .ChoiceBut {
        width: size(240);
        height: size(80);
        line-height: size(80);
        font-size: size(30);
        color: #ffffff;
        border-radius: size(12);
        text-align: center;
      }
      .yes {
        background: #e60000;
      }
      .no {
        background: #dddddd;
      }
    }
  }
}
</style>