<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="title">如果选择立即加入免单您将无法享受</div>
        <div class="con border-bottom">
          <p>1.无法享受7天无理由退款</p>
          <p>2.如果商品质量问题，商家将优先免费更换</p>
        </div>
        <div class="btns">
          <div @click="lcb&&lcb();hide()">排队免单</div>
          <div @click="rcb&&rcb();hide()">一般收货</div>
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
  border-radius: size(34);
  overflow: hidden;
  text-align: center;
  .title{
    font-size: size(30);
    color: #373737;
    line-height: 1.4;
    margin: size(44) 0;
  }
  .con{
    font-size: size(26);
    color: #666;
    padding: 0 size(120);
    text-align: left;
    line-height: 1.4;
    p{
      margin-bottom: size(15);
    }
    padding-bottom: size(70);
    &:after{
      background-color: #a5a5a5;
    }
  }
  .btns{
    line-height: size(90);
    display: flex;
    font-size: size(30);
    color: #4b4b4b;
    >div{
      flex:1;
      &:first-child{
        background: #ea2224;
        color:#fff;
      }
    }
  }
}
</style>