<template>
  <div class="withdraw_warp">
    <div class="showItem">
      <div class="title">储蓄卡</div>
      <div class="no_card" v-if="haveCard === 0" @click="$refs.addcard.show()">请添加银行卡</div>
      <div class="no_card" v-if="haveCard === 1">建设银行</div>
    </div>
    <div class="showItem">
      <div class="title">金额</div>
      <div class="setMoney">
        <div class="money">
          <input
            type="number"
            :placeholder="showCanWithdraw"
            v-model="wantWithdraw"
            autocomplete="off"
          />
        </div>
        <div class="all_withdraw" @click="allWithdraw">全部提现</div>
      </div>
    </div>
    <div class="withdraw_button" @click="jumpWithdraw">提现</div>
    <div class="hint_list">
      <div class="item">
        <span></span>每次提现不少于10元
      </div>
      <div class="item">
        <span></span>每天可申请提现3次，每天提现不超过10.000元
      </div>
      <div class="item">
        <span></span>平台会根据税法扣除相应个人所得税
      </div>
      <div class="item">
        <span></span>目前仅支持体系到本人银行卡
      </div>
    </div>
    <addCard ref="addcard"></addCard>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
import { Toast } from "lib";
import addCard from "base/addCard";
export default {
  data() {
    return {
      canWithdraw: 200.12,
      wantWithdraw: "",
      toWithdraw: 0,
      haveCard: 0
    };
  },
  components: {
    addCard
  },
  computed: {
    showCanWithdraw: function() {
      const { canWithdraw } = this;
      return `可提现金额${canWithdraw}元`;
    }
  },
  mixins: [tojump],
  methods: {
    allWithdraw() {
      this.wantWithdraw = this.canWithdraw + "";
    },
    jumpWithdraw() {
      if (this.haveCard === 0) {
        Toast("请先添加银行卡");
        return;
      }
      if (this.toWithdraw === 0) {
        Toast("请先输入正确金额");
        this.wantWithdraw = "";
        return;
      }
      Toast("申请提现成功，预计1-3个工作日内到账");
      this.tojump("/record");
    }
  },
  watch: {
    wantWithdraw(val) {
      if (+val > this.canWithdraw) {
        this.wantWithdraw = this.canWithdraw;
      }
      this.toWithdraw = +this.wantWithdraw;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.withdraw_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding-top: size(40);
  position: relative;
  .showItem {
    display: flex;
    padding: 0 size(30);
    height: size(100);
    line-height: size(100);
    background: #ffffff;
    font-size: size(28);
    .title {
      color: #333;
      flex: 1;
    }
    .no_card {
      width: size(562);
      color: #aaaaaa;
    }
    .setMoney {
      width: size(562);
      display: flex;
      justify-content: space-between;
      color: #aaaaaa;
      .money {
        & > input {
          &::-webkit-input-placeholder {
            color: #aaaaaa;
            font-size: size(28);
          }
        }
      }
      .all_withdraw {
        color: #ff0000;
      }
    }
  }
  .withdraw_button {
    width: size(690);
    height: size(90);
    line-height: size(90);
    border-radius: size(46);
    font-size: size(32);
    text-align: center;
    background-image: linear-gradient(90deg, #ff2d23 0%, #ff4169 100%);
    color: #ffffff;
    position: absolute;
    top: size(307);
    left: 0;
    right: 0;
    margin: auto;
  }
  .hint_list {
    position: absolute;
    bottom: size(35);
    margin-left: size(82);
    .item {
      color: #999999;
      font-size: size(28);
      height: size(40);
      line-height: size(40);
      display: inline-block;
      margin-top: size(4);
      & > span {
        display: inline-block;
        margin-right: size(12);
        width: size(8);
        height: size(8);
        border-radius: 50%;
        background: #999999;
        margin-bottom: size(5);
      }
    }
  }
}
</style>