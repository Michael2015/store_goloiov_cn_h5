<template>
  <div class="withdraw_warp">
    <top-head>提现</top-head>
    <div class="showItem">
      <div class="title">储蓄卡</div>
      <div class="no_card" v-if="haveCard === 0" @click="$refs.addcard.show()">请添加银行卡</div>
      <div class="have_card" v-if="haveCard === 1" @click="compileCard">{{bank_code}}</div>
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
            pattern="[0-9]*"
            maxlength="24"
          />
        </div>
        <div class="all_withdraw" @click="allWithdraw">全部提现</div>
      </div>
    </div>
    <div class="withdraw_button" @click="jumpWithdraw">提现</div>
    <div class="hint_list" v-if="isShowBottom">
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
        <span></span>目前仅支持提现到本人银行卡
      </div>
    </div>
    <addCard ref="addcard" @add-card="jumpAddCard"></addCard>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
import { Toast } from "lib";
import addCard from "base/addCard";
import { OK } from "api/request";
import { withdraw, extract } from "api/income";
export default {
  data() {
    return {
      canWithdraw: 0, // 可提取金额
      wantWithdraw: "", // 想提取金额
      toWithdraw: 0, // 去提取金额
      haveCard: 0, // 标识是否有银行卡
      bank_code: "", // 银行卡号
      bank_name: "", // 银行所属
      extra: "", // 地方
      real_name: "", //持卡人
      documentHeight: document.documentElement.clientHeight, //记录屏幕一开始高度
      showHeight: document.documentElement.clientHeight //记录屏幕一开始高度(对比)
    };
  },
  components: {
    addCard
  },
  computed: {
    showCanWithdraw: function() {
      const { canWithdraw } = this;
      return `可提现金额${canWithdraw}元`;
    },
    // 针对部分手机唤起键盘导致底部被顶影响，当页面缩小底部隐藏
    isShowBottom() {
      return this.documentHeight <= this.showHeight;
    }
  },
  mixins: [tojump],
  methods: {
    allWithdraw() {
      if (this.canWithdraw >= 10000) {
        this.wantWithdraw = 10000 + "";
      } else {
        this.wantWithdraw = this.canWithdraw + "";
      }
    },
    jumpWithdraw() {
      if (this.haveCard === 0) {
        Toast("请先添加银行卡");
        return;
      }
      if (this.toWithdraw < 10 || this.toWithdraw > 10000) {
        Toast("请先输入正确金额");
        this.wantWithdraw = "";
        return;
      }
      extract(this.toWithdraw, ["bank", "wx"][0]).then(res => {
        Toast(res.msg);
        if (res.code === OK) {
          this.tojump("/record");
        } else if (res.code === 400) {
          return;
        }
      });
    },
    jumpAddCard() {
      const { real_name, bank_code } = this;
      this.tojump("/relevanceCard");
      this.$refs.addcard.hide();
    },
    compileCard() {
      const { real_name, bank_code } = this;
      this.tojump(
        `/relevanceCard?real_name=${real_name}&bank_code=${bank_code}`
      );
    }
  },
  watch: {
    wantWithdraw(val) {
      if (+val >= 10000) {
        if (this.canWithdraw < 10000) {
          this.wantWithdraw = this.canWithdraw;
        } else {
          this.wantWithdraw = 10000;
        }
      } else if (+val >= this.canWithdraw) {
        this.wantWithdraw = this.canWithdraw;
      }
      this.toWithdraw = +this.wantWithdraw;
    }
  },
  async mounted() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight;
      })();
    };

    const reque = await withdraw();
    this.canWithdraw = +reque.withdraw_amount;
    if (reque.bank_code) {
      this.haveCard = 1;
      this.bank_code = reque.bank_code;
      this.bank_name = reque.bank_name;
      this.real_name = reque.real_name;
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
      width: size(150);
    }
    .no_card {
      width: size(562);
      color: #aaaaaa;
      flex: 1;
    }
    .have_card {
      width: size(562);
      color: #333;
      flex: 1;
    }
    .setMoney {
      width: size(562);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #aaaaaa;
      flex: 1;
      .money {
        flex: 1;
        & > input {
          height: size(60);
          line-height: normal;
          font-size: size(28);
          &::-webkit-input-placeholder {
            color: #aaaaaa;
            font-size: size(28);
            line-height: normal;
          }
        }
      }
      .all_withdraw {
        color: #ff0000;
        padding-left: size(30);
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
    margin: auto;
    margin-top: size(66);
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