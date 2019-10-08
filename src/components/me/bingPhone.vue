<template>
  <div class="phone_warp">
    <div class="show_warp" v-if="phone !== ''">
      已绑定：
      <span>{{phonehide(phone)}}</span>
    </div>
    <div class="show_bind" v-else-if="phone === ''">
      <div class="bind_item">
        <input type="number" placeholder="输入手机号" />
        <div class="clone">x</div>
      </div>
      <div class="bind_item">
        <input type="text" />
        <div class="getcode">获取验证码</div>
      </div>
    </div>
    <div class="check_phone" @click="checkphone">{{phone===''?'绑定手机':'更换绑定手机'}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "15347407062"
    };
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    checkphone() {
      if (this.phone === "") {
        this.phone = "15347407062";
      } else if (this.phone !== "") {
        this.phone = "";
      }
    }
  }
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
      line-height: size(122);
      border-bottom: size(2) solid #f5f5f5;
      &:nth-child(1) {
        border-top: size(2) solid #f5f5f5;
      }
      & > input {
        padding-left: size(30);
        font-size: size(30);
        &::-webkit-input-placeholder {
            color: #999;
          }
      }
      .clone {
        width: size(36);
        height: size(36);
        background-color: #cccccc;
        line-height: size(36);
        text-align: center;
        color: #fff;
        border-radius: 50%;
        margin-right: size(30);
        margin-top: size(42);
      }
      .getcode {
        width: size(217);
        height: size(56);
        line-height: size(56);
        text-align: center;
        background-color: #eeeeee;
        border-radius: size(28);
        font-size:size(26);
        color: #999999;
        margin-right: size(34);
        margin-top: size(31);
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
    position: absolute;
    left: 0;
    right: 0;
    top: size(314);
    margin: auto;
  }
}
</style>