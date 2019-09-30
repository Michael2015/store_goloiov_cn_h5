<template>
  <div class="wrap">
    <div class="top-wrap">
      <div class="top">
        <!-- 合伙人端 -->
        <div class="table" v-if="isLogin && role === 1">
          <div class="table-cell">
            <search-input v-model="keyword" class="input"></search-input>
          </div>
          <div class="table-cell invite-wrap">
            <span class="invite">邀请合伙人</span>
          </div>
        </div>
        <!-- 非合伙人 | 游客(未登录) --->
        <index-top-customer v-else></index-top-customer>
        <!-- 轮播图 -->
        <div class="banner-wrap">
          <div class="banner">
            <index-banner></index-banner>
          </div>
        </div>
      </div>
      <div class="blank"><img src="~img/index-top-bg.png" alt=""></div>
    </div>
    <msg-loop v-if="false"></msg-loop>
    <index-focus :cid="cid" v-if="cid"></index-focus>
    <div class="filters table">
      <div :class="{active:activeCategoryIndex===index}" v-for="(item,index) in category" :key="index"
        @click="setCategory(index)"><span>{{item.cate_name}}</span></div>
    </div>
    <load-more v-slot="{list}" class="list-wrap" :getData="getCategoryProducts" v-if="activeCategoryIndex >= 0" :key="activeCategoryIndex">
      <div class="list clearfix">
        <index-goods-item class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item>
      </div>
    </load-more>
    <load-more v-slot="{list}" class="list-wrap" :getData="getDefaultProducts" v-else>
      <div class="list clearfix">
        <index-goods-item class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item>
      </div>
    </load-more>
  </div>
</template>

<script>
import SearchInput from 'base/ui/search-input'
import IndexTopCustomer from './index-top-customer'
import MsgLoop from 'base/msg-loop'
import IndexBanner from './index-banner'
import IndexFocus from './index-focus'
import IndexGoodsItem from './index-goods-item'
import LoadMore from 'base/load-more'
import {Loading} from 'lib'
import {getCategory, getCategoryProducts, CustomerGetProducts, PartnerGetProducts} from 'api'
import {mapState} from 'vuex'

export default {
  components: {
    LoadMore,
    SearchInput,
    IndexTopCustomer,
    IndexBanner,
    MsgLoop,
    IndexFocus,
    IndexGoodsItem
  },
  data() {
    return {
      keyword: '',
      categoryList: [],
      activeCategoryIndex: -1
    }
  },
  computed: {
    ...mapState(['isLogin', 'role']),
    category() {
      return this.categoryList.slice(1)
    },
    cid() {
      return this.categoryList[0] && this.categoryList[0].id
    },
    getCategoryProducts() {
      return (page, size) => {
        return getCategoryProducts(this.category[this.activeCategoryIndex].id, page, size)
      }
    },
    getDefaultProducts() {
      // 没有选择标签时
      return (page, size) => {
        return this.role === 1 ? PartnerGetProducts(this.keyword, page, size) : CustomerGetProducts(page, size)
      }
    }
  },
  created() {
    Loading.open()
    Promise.all([
      getCategory().then(data => {
        if (data) {
          this.categoryList = data
        }
      })
    ]).then(() => {
      Loading.close()
    })
  },
  methods: {
    setCategory(i){
      console.log(i)
      if (i !== this.activeCategoryIndex) {
        this.activeCategoryIndex = i
      }
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
      background: #fff;
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
.list-wrap{
  padding-bottom: size(120);
}
.list{
  padding: 0 size(20);
  margin-left: -3%;
  .item{
    float: left;
    margin-bottom: size(18);
  }
}
</style>