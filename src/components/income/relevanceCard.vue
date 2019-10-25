<template>
  <div class="add_card_warp">
    <top-head>{{headerTitle}}</top-head>
    <div class="msg_item">
      <div class="title">持卡人</div>
      <div class="import">
        <input type="text" placeholder="输入持卡人姓名" v-model="real_name" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">卡号</div>
      <div class="import">
        <input type="number" placeholder="输入银行卡号" pattern="[0-9]*" v-model="bank_code" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">所在省</div>
      <div class="import">
        <input type="text" placeholder="请输入银行卡所在省" v-model="province" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">所在市</div>
      <div class="import">
        <input type="text" placeholder="请输入银行卡所在市" v-model="city" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">开户支行</div>
      <div class="import">
        <input type="text" placeholder="请输入银行卡开户支行" v-model="sub_branch" />
      </div>
    </div>
    <div class="withdraw_btn" @click="updateCard">确定</div>
    <div class="hint">银行卡持卡人必须与当前微信账户同名</div>
  </div>
</template>

<script>
import { Toast } from "lib";
import { bindbank } from "api/income";
import { OK } from "api/request";
export default {
  data() {
    return {
      real_name: "",
      bank_code: "",
      province: "",
      city: "",
      sub_branch: "",
      headerTitle:'添加银行卡'
    };
  },
  methods: {
    updateCard() {
      const { real_name, bank_code, province, city, sub_branch } = this;
      if (!real_name) {
        Toast("请填写持卡人姓名");
        return;
      }
      if (!bank_code) {
        Toast("请填写银行卡号");
        return;
      }
      if (!province) {
        Toast("请填写银行卡所在省");
        return;
      }
      if (!city) {
        Toast("请填写银行卡所在市");
        return;
      }
      if (!sub_branch) {
        Toast("请填写银行卡开户支行");
        return;
      }
      bindbank({
        real_name,
        bank_code,
        extra: province + " " + city + " " + sub_branch
      }).then(res => {
        console.log(res);
        if (res.code === OK) {
          this.$router.back();
          Toast("保存成功");
        } else {
          Toast(res.msg);
          return;
        }
      });
    }
  },
  mounted() {
    const { real_name, bank_code } = this.$route.query;
    if(bank_code!==undefined && real_name!==undefined ){
      this.headerTitle = '更改银行卡'
    }
    this.real_name = real_name;
    this.bank_code = bank_code;
  },
  watch: {
    bank_code(val){
      if(val.length > 19){
        this.bank_code = val.substring(0,19)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.add_card_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding-top: size(40);
  .msg_item {
    height: size(100);
    line-height: size(100);
    background: #fff;
    display: flex;
    font-size: size(28);
    align-items: center;
    .title {
      flex: 1;
      padding-left: size(30);
    }
    .import {
      width: size(570);
      &>input{
        line-height: normal;
      }
    }
  }
  .withdraw_btn {
    margin: size(80) auto size(22) auto;
    width: size(690);
    height: size(90);
    line-height: size(90);
    background: linear-gradient(90deg, #ff2d23 0%, #ff4169 100%);
    border-radius: size(46);
    color: #fff;
    font-size: size(32);
    text-align: center;
  }
  .hint {
    color: #999999;
    font-size: size(24);
    text-align: center;
  }
}
</style>