<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="title">如果选择立即加入排队免单您将：</div>
        <div class="con">
          <p>1.无法享受7天无理由退款</p>
          <p>2.如果商品质量问题，商家将优先免费更换</p>
        </div>
        <div class="btns">
          <div @click="lcb&&lcb();hide()" class="btn-inline">排队免单</div>
          <div @click="rcb&&rcb();hide()" class="btn-inline">一般收货</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
import popup from 'ui/popup'
export default {
  components: {
    popup
  },
  mixins: [showHide],
  data() {
    return {
      lcb: null,
      rcb: null
    }
  },
  methods: {
    show(lcb, rcb) {
      this.isShow = true
      this.lcb = lcb || null
      this.rcb = rcb || null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  background: #fff;
  width: p(604/750);
  min-height: 100px;
  border-radius: size(18);
  overflow: hidden;
  text-align: center;
  .title{
    font-size: size(32);
    color: #373737;
    line-height: 1.4;
    margin: size(44) 0;
    font-weight: 800;
  }
  .con{
    font-size: size(28);
    color: #666;
    padding: 0 size(100);
    text-align: left;
    line-height: 1.4;
    p{
      margin-bottom: size(15);
    }
    padding-bottom: size(20);
    &:after{
      background-color: #a5a5a5;
    }
  }
  .btns{
    color: #4b4b4b;
    padding-bottom: size(36);
    .btn-inline{
      font-size: size(26);
      padding: size(20) size(56);
      border-radius: size(34);
      &:first-child{
        margin-right: size(42);
        background-image: linear-gradient(135deg, 	#ff0000 0%, #ff3061 100%);
        color: #fff;
        border:none;
      }
      &:last-child{
        color: #333;
        border-color: #6b6b6b;
        padding: size(18) size(56);
      }
    }
  }
}
</style>