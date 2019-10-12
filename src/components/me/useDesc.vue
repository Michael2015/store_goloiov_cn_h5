<template>
  <div class="div">
    <div class="item" @click="tojump('/partnerjieshao')">
      合伙人及访客介绍
      <img src="~img/icon/right.png" />
    </div>
    <div class="item" @click="tojump('/gongpaijieshao')">
      免单奖励介绍
      <img src="~img/icon/right.png" />
    </div>
    <div class="item" @click="tojump('/incomejieshao')">
      收益及提现介绍
      <img src="~img/icon/right.png" />
    </div>
    <div class="disclaimer">
      <div @click="tojump('/xieyi')">《用户协议及免责说明》</div>
      <div>版权所有 万车品</div>
      <div>技术支持 深圳市元征科技股份有限公司</div>
      <div>法律支持 广东律叁律师事务所</div>
    </div>
    <div class="item" @click="tojump('/caozuojieshao')">
      操作教程
      <img src="~img/icon/right.png" />
    </div>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
export default {
  mixins: [tojump]
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.div {
  background: #f0f0f0;
  box-shadow: inset 0 size(15) size(10) size(-15) #eeeeee;
  width: 100%;
  height: 100%;
  padding-top: size(24);
  .item {
    height: size(108);
    background: #fff;
    font-size: size(28);
    border-bottom: size(1) solid #f0f0f0;
    padding: 0 size(50) 0 size(32);
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: size(14);
      height: size(25);
    }
  }
  .disclaimer {
    width: 100%;
    height: auto;
    position: fixed;
    top: 85%;
    text-align: center;
    font-size: size(24);
    color: #a7a7a7;
    line-height: 1.8;
  }
}

.disclaimer div:nth-child(1) {
  color: #3c6ad2;
}
</style>