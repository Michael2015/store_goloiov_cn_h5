<template>
  <div class="wrap">
    <div class="con">
      <div class="title">
        <img src="~img/icon/ok.png" alt="">
        支付成功
      </div>
      <div class="all-pay">
        <span>实付 ¥{{info.total_price}}</span>
      </div>
      <div class="opts">
        <router-link tag="span" class="btn-inline" replace to="/order">查看订单</router-link>
        <router-link tag="span" class="btn-inline" replace to="/index">返回首页</router-link>
      </div>
      <div class="bottom-info" v-if="info.is_platoon == 1">
        <div class="text">
          幸运码：{{info.platoon_number}}
        </div>
        <router-link tag="div" class="gongpai-ruler" to="/gongpaijieshao">了解免单奖励规则</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    if (this.$route.params.info) {
      this.info = this.$route.params.info
    } else {
      alert('缺少订单信息')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
  .con{
    background: #fff;
    overflow: hidden;
  }
}
.title{
  line-height: size(80);
  text-align: center;
  font-size: size(58);
  font-weight: 800;
  margin-top: size(60);
  img{
    vertical-align: middle;
    width: size(56);
  }
}
.all-pay{
  font-size: size(34);
  color: #666;
  text-align: center;
  line-height: size(48);
  margin-top: size(16);
}
.opts{
  text-align: center;
  margin: size(50) 0;
  .btn-inline{
    margin-left: size(58);
    &:first-child{
      margin-left: 0;
    }
  }
}
.bottom-info{
  border-top: 2px dashed #f0f0f0;
  padding: size(50) size(60);
  .gongpai-ruler{
    text-align: center;
    font-size: size(28);
    text-decoration: underline;
  }
  .text{
    text-align: center;
    color: #999;
    font-size: size(28);
    line-height: 1.5;
    margin-bottom: size(20);
  }
}
</style>