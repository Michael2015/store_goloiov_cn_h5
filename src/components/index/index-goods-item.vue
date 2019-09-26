<template>
  <div class="goods-item">
    <div class="img-wrap"><img src="https://wcp.szyrwl.com/public/uploads/attach/2019/04/10/5cad6ccbdeea2.jpg" alt=""></div>
    <div class="con">
      <div class="name">车联网车载OBD智能盒子GPS定位</div>
      <div class="price-num">
        <span class="price">¥376.00</span>
        <span class="num">销量127</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.goods-item{
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  width: 47%;
  margin-left: 2.95%;
  .img-wrap{
    position: relative;
    padding-bottom: 100%;
    img{
      position: absolute;
      @include fill;
      left: 0;
      top:0;
    }
  }
  .con{
    padding: 0 size(16);
  }
  .name{
    margin-top: size(20);
    font-size: size(28);
    color: #4a4a4a;
    line-height: size(34);
    height: size(68);
    @include txt-overflow(2);
  }
  .price-num{
    line-height: size(42);
    margin: size(26) 0;
    .price{
      font-size: sizeZ(30);
      color: #ff5500;
    }
    .num{
      float:right;
      font-size: size(22);
      color: #c7c7c7;
    }
  }
  // 免单标签
  position: relative;
  &.free{
    &:after{
      content: '免单';
      position: absolute;
      height: size(32);
      line-height: size(32);
      background: #ff0000;
      right: size(-62);
      top: size(-28);
      color: #fff;
      font-size: size(22);
      width: size(120);
      text-align: center;
      transform-origin: 0% 0%;
      transform: rotateZ(45deg);
    }
  }
}
</style>