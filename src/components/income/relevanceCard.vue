<template>
  <div class="add_card_warp">
    <div class="msg_item">
      <div class="title">持卡人</div>
      <div class="import">
        <input type="text" placeholder="输入持卡人姓名" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">卡号</div>
      <div class="import">
        <input
          type="number"
          v-model="card"
          placeholder="输入银行卡号"
          οnkeyup="this.value=this.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')"
        />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">银行</div>
      <div class="import">
        <input type="text" placeholder="选择银行" />
      </div>
    </div>
    <div class="msg_item">
      <div class="title">支行</div>
      <div class="import">
        <input type="text" placeholder="选择输入开户支行" />
      </div>
    </div>
    <div class="withdraw_btn" @click="$router.back()">提现</div>
    <div class="hint">银行卡持卡人必须与当前微信账户同名</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: ""
    };
  }
//   watch: {
//     card(val) {
//       this.$nextTick(() => {
//         this.card = val.replace(/\s/g, "").replace(/....(?!$)/g, "$& ");
//       });
//     }
//   }
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
    .title {
      flex: 1;
      padding-left: size(30);
    }
    .import {
      width: size(592);
      // &>input{}
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