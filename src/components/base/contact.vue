<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="head">
          <img src="" alt="">
        </div>
        <div class="col border-bottom">
          <div class="name">昵称</div>
          <div class="value">大王叫我来巡山</div>
          <div class="btn-inline">复制</div>
        </div>
        <div class="col">
          <div class="name">手机</div>
          <div class="value">13258696666</div>
          <a class="btn-inline" href="#">呼叫</a>
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
  mixins: [showHide]
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  width: p(600/750);
  background: #fff;
  min-height: 100px;
  border-radius: 10px;
  padding: size(50);
  position: relative;
  .col{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: size(40) 0;
  }
  .head{
    position: absolute;
    left: 50%;
    top: size(-96);
    margin-left: size(-144/2);
    @include circle(144);
    border: 3px solid #fff;
    background: #d5d5d5;
    overflow: hidden;
    img{
      display: block;
      @include fill;
    }
  }
  .name{
    font-size: size(28);
    color: #666;
  }
  .value{
    font-weight: 800;
    font-size: size(28);
    color: #333;
    width: 50%;
    @include txt-overflow;
    text-align: center;
  }
}
</style>