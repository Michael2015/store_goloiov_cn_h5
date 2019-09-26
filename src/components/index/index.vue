<template>
  <div class="wrap">
    <div class="top-wrap">
      <div class="top">
        <!-- 合伙人端 -->
        <div class="table" v-if="false">
          <div class="table-cell">
            <search-input v-model="keyword" class="input"></search-input>
          </div>
          <div class="table-cell invite-wrap">
            <span class="invite">邀请合伙人</span>
          </div>
        </div>
        <!-- 非合伙人 --->
        <div class="table">
          <div class="table-cell">
            <div class="clearfix">
              <img src="~img/shop-logo.png" alt="" class="parent-avatar">
              <span class="shop-name">万车品商城</span>
            </div>
          </div>
          <div class="table-cell invite-wrap">
            <span class="invite">成为合伙人</span>
            <!-- <span class="invite">登录/注册</span> -->
          </div>
        </div>
        <div class="banner-wrap">
          <div class="banner">
            <index-banner :imgs="banner"></index-banner>
          </div>
        </div>
      </div>
      <div class="blank"><img src="~img/index-top-bg.png" alt=""></div>
    </div>
    <msg-loop v-if="false"></msg-loop>
    <index-focus></index-focus>
    <div class="filters table">
      <div class="active"><span>全部</span></div>
      <div><span>用品</span></div>
      <div><span>美容</span></div>
      <div><span>工具</span></div>
      <div><span>课堂</span></div>
      <div><span>其他</span></div>
    </div>
    <div class="list clearfix">
      <index-goods-item class="item" v-for="item in 5" :key="item"></index-goods-item>
    </div>
  </div>
</template>

<script>
import SearchInput from 'base/ui/search-input'
import MsgLoop from 'base/msg-loop'
import IndexBanner from './index-banner'
import IndexFocus from './index-focus'
import IndexGoodsItem from './index-goods-item'

export default {
  components: {
    SearchInput,
    IndexBanner,
    MsgLoop,
    IndexFocus,
    IndexGoodsItem
  },
  data() {
    return {
      keyword: null,
      banner: ['https://storemp.golodata.com/public/uploads/attach/2019/08/09/-1/5d4d4046af543.jpg', 'https://storemp.golodata.com/public/uploads/attach/2019/08/09/-1/5d4d4046af543.jpg']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
}
.top-wrap{
  position: relative;
  .blank{
    height: size(78);
    position: relative;
    img{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
}
.top{
  background: linear-gradient(to right, #ff090b, #fe3847);
  padding: size(28) size(20);
  padding-bottom: 0;
  .banner-wrap{
    margin-top: size(28);
    height: size(224);
    position: relative;
    .banner{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: size(300);
      background: gold;
      border-radius: size(14);
      overflow: hidden;
      z-index: 1;
    }
  }
  .table{
    height: size(64);
  }
  .input{
    height: size(64);
  }
  .invite-wrap{
    text-align: right;
    width: size(180);
  }
  .invite{
    color: #fff;
    font-size: size(26);
    line-height: size(60);
    height: size(60);
    min-width: size(154);
    padding: 0 size(12);
    // margin-left: size(20);
    display: inline-block;
    background-color: #fe2b36;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    text-align: center;
  }
  .parent-avatar{
    width: size(72);
    height: size(72);
    border-radius: 5px;
    float: left;
    background: #ddd;
  }
  .shop-name{
    vertical-align: middle;
    float: left;
    line-height: size(72);
    font-size: size(38);
    color: #fff;
    margin-left: size(22);
  }
}
.filters{
  text-align: center;
  height: size(72);
  padding: 0 size(16);
  margin: size(12) 0;
  font-size: size(30);
  color: #595959;
  >div{
    display: table-cell;
    vertical-align: middle;
    &.active{
      font-size: size(32);
      color: #252525;
      position: relative;
      &:after{
        content: ' ';
        position: absolute;
        left:50%;
        bottom: 0;
        height: size(6);
        background-color: #ff0000;
        border-radius: size(3);
        width: 56%;
        transform: translateX(-50%);
      }
    }
  }
}
.list{
  padding: 0 size(20) size(120);
  margin-left: -3%;
  .item{
    float: left;
    margin-bottom: size(18);
  }
}
</style>