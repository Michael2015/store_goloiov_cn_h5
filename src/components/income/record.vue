<template>
  <div class="record_warp">
    <div class="withdraw_record" v-for="(item,index) in recordList" :key="index">
      <div class="left">
        <div class="title">提现</div>
        <div class="time">{{item.time}}</div>
      </div>
      <div class="right">
        <div class="money">¥{{item.money}}</div>
        <div class="processeding" v-if="item.state === 0">处理中</div>
        <div class="accomplish" v-else-if="item.state === 1">已完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordList: [
        { time: "2018-03-12 12:32:58", money: "1199.00", state: 0 },
        { time: "2018-03-12 12:32:58", money: "21.00", state: 1 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.record_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .withdraw_record {
    margin-top: size(1);
    position: relative;
    height: size(130);
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: size(24);
    padding: size(19) size(30) size(21);
    .left {
      .title {
        margin-top: size(2);
        font-size: size(30);
        color: 333333;
        height: size(42);
        line-height: size(42);
      }
      .time {
        margin-top: size(13);
        color: #999999;
        line-height: size(33);
        height: size(33);
      }
    }
    .right {
      color: #fe0000;
      .money {
        margin-bottom: size(9);
        font-size: size(34);
        height: size(48);
        line-height: size(48);
      }
      .processeding {
        text-align: right;
        line-height: size(33);
        height: size(33);
      }
      .accomplish {
        color: #999999;
        text-align: right;
        line-height: size(33);
        height: size(33);
      }
    }
    &:after {
      content: " ";
      display: block;
      width: 100%;
      height: size(1);
      background: #edecec;
      transform: scaleY(0.5);
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>