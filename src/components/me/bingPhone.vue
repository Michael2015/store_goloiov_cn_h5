<template>
  <div class="phone_warp">
    <top-head>手机绑定</top-head>
    <div class="show_warp" v-if="inputPhone !== ''">
      已绑定：
      <span>{{phonehide(inputPhone)}}</span>
    </div>
    <div class="show_bind" v-else-if="inputPhone === ''">
      <div class="bind_item">
        <input
          type="number"
          autocomplete="off"
          pattern="[0-9]*"
          v-model="enterPhone"
          placeholder="输入手机号"
        />
        <div class="clone" @click="clearPhone"></div>
      </div>
      <div class="bind_item">
        <input type="number" autocomplete="off" pattern="[0-9]*" maxlength="4" v-model="code" />
        <div class="getcode" @click="getcode">{{timeing?`${Time}s`:showTitle}}</div>
      </div>
    </div>
    <div class="check_phone" @click="checkphone">{{inputPhone===''?'绑定手机':'更换绑定手机'}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Loading, Toast } from "lib";
import { legitimatephone, sendsms, editphone } from "api/me";
import { updateUserInfo } from "api/me";

export default {
  data() {
    return {
      inputPhone: "",
      enterPhone: "",
      code: "",
      Time: 0,
      timeobj: null,
      showTitle: "获取验证码"
    };
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    async checkphone() {
      if (this.inputPhone === "") {
        //  绑定手机
        if (!this.enterPhone) {
          Toast("请输入手机号");
          return;
        }
        if (!/^[1]([3-9])[0-9]{9}$/.test(this.enterPhone)) {
          Toast("请填写正确手机号");
          return;
        }
        if (!this.code) {
          Toast("请输入验证码");
          return;
        }
        // 修改绑定手机接口
        Loading.open();
        const reque = await editphone({
          newMobile: this.enterPhone,
          verifyCode: this.code
        });
        if (reque.code === 400) {
          Loading.close();
          Toast(reque.msg);
          return;
        } else if (reque.code === 200) {
          Loading.close();
          Toast("改绑成功");
          updateUserInfo().then(() => {
            this.$router.back();
          });
        }
      } else if (this.inputPhone !== "") {
        //  改绑手机
        this.clear()
      }
    },
    clear() {
      this.inputPhone = "";
    },
    clearPhone(){
      this.enterPhone = "";
    },
    async getcode() {
      if (this.timeing) {
        return;
      }
      if (!this.enterPhone) {
        Toast("请输入手机号");
        return;
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(this.enterPhone)) {
        Toast("请填写正确手机号");
        return;
      }
      // 验证手机号是否已被绑定
      const res1 = await legitimatephone({ mobile: this.enterPhone });
      if (res1.code === 200 && res1.data.is_exist) {
        Toast("该手机号已被绑定");
        return;
      }
      // 获取验证码
      const res2 = await sendsms({
        mobile: this.enterPhone,
        event: "changePhone"
      });
      if (res2.code === 200) {
        Toast(res2.msg);
        this.Time = 60;
        this.timeobj = setInterval(() => {
          this.Time--;
          if (this.Time === 0) {
            clearInterval(this.timeobj);
            this.showTitle = "重新获取";
          }
        }, 1000);
      }
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    timeing() {
      return this.Time !== 0;
    }
  },
  mounted() {
    this.inputPhone = this.userInfo.phone || "";
  },
  watch: {
    enterPhone(val){
      if(val.length>11){
        this.enterPhone = val.substring(0,11)
      }
    },
    code(val){
      if(val.length > 4){
        this.code = val.substring(0,4)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.phone_warp {
  .show_warp {
    height: size(314);
    line-height: size(314);
    color: #666666;
    font-size: size(28);
    text-align: center;
    & > span {
      font-size: size(46);
      color: #333333;
    }
  }
  .show_bind {
    .bind_item {
      display: flex;
      height: size(122);
      align-items: center;
      padding: 0 size(30);
      border-bottom: size(2) solid #f5f5f5;
      &:nth-child(1) {
        border-top: size(2) solid #f5f5f5;
      }
      & > input {
        font-size: size(30);
        padding-right: size(30);
        &::-webkit-input-placeholder {
          color: #999;
        }
      }
      .clone {
        width: size(36);
        height: size(36);
        @include bg("~img/icon/clear.png");
      }
      .getcode {
        width: size(330);
        height: size(56);
        line-height: size(56);
        text-align: center;
        background-color: #eeeeee;
        border-radius: size(28);
        font-size: size(26);
        color: #999999;
      }
    }
  }
  .check_phone {
    width: size(558);
    height: size(90);
    background-color: #ff2741;
    border-radius: size(45);
    line-height: size(90);
    text-align: center;
    font-size: size(36);
    color: #fff;
    margin: size(70) auto;
  }
}
</style>