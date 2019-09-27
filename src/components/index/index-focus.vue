<template>
  <div class="focus">
    <!-- 首页专区 -->
    <div class="t-title"><img src="~img/golox3.png" alt="">车联网专区</div>
    <div class="swiper-wrap">
      <swiper v-if="list&&list.length>0">
        <swiper-item v-for="(item,index) in list" :key="index">
          <div class="focus-item table">
            <div class="goods-img"><img src="" alt=""></div>
            <div class="desc">
              <div class="title">元征golo X3 智能车联网车载智慧终端汽车诊断仪车载wifi智能盒子行能盒子行能盒子行</div>
              <div class="free" v-if="1">免单</div>
              <div class="free-blank" v-else></div>
              <div class="price-num">
                <span class="num">销量127</span>
                <span class="price">¥495.00</span>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import swiper from 'base/swiper/swiper'
import swiperItem from 'base/swiper/swiper-item'
import {getCategoryProducts} from 'api'
export default {
  props: ['cid'],
  components: {
    swiper,
    swiperItem
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    getCategoryProducts(this.cid).then(data => {
      if (data) {
        this.list = data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.focus{
  .t-title{
    text-align: center;
    font-size: size(32);
    color: #4d4d4d;
    font-weight: 800;
    line-height: size(45);
    margin: size(18) 0  size(14);
    img{
      width: size(32);
      vertical-align: top;
      position: relative;
      top: 3px;
      margin-right: 4px;;
    }
  }
}
.focus-item{
  min-height: size(224);
  box-shadow: 0px 1px 5px 0px rgba(205, 205, 205, 0.5);
  background: #fff;
  border-radius: 6px;
  padding: 0 size(18);
  >div{
    display: table-cell;
    vertical-align: top;
    padding-top: size(34);
  }
  .goods-img{
    width: size(156);
    img{
      display: block;
      width: size(156);
      height: size(156);
      background: #ddd;
    }
  }
  .desc{
    padding-left: size(14);
  }
  .title{
    font-size: size(28);
    line-height: size(34);
    color: #4a4a4a;
    min-height: size(64);
    @include txt-overflow(2);
  }
  .free,.free-blank{
    height: size(32);
    line-height: size(32);
    text-align: center;
    margin: size(18) 0 size(8);
  }
  .free{
    font-size: size(20);
    color: #dd1a21;
    border-radius: 4px;
    border: solid 1px #de1f26;
    width: size(78)
  }
  .price-num{
    line-height: size(42);
    .num{
      font-size: size(22);
      color: #c7c7c7;
    }
    .price{
      float: right;
      font-size: size(30);
      color: #ff5500;
    }
  }
}
</style>