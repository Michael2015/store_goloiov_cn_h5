<template>
  <div class="wrap">
    <div class="top-wrap">
      <div class="top">
        <!-- 合伙人端 -->
        <div class="table" v-if="isLogin && role === 1">
          <div class="table-cell">
            <search-input v-model="keyword" class="input" @search="search"></search-input>
          </div>
          <div class="table-cell invite-wrap">
            <span class="invite" @click="invite">邀请合伙人</span>
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
    <index-msg-loop v-if="isLogin && role === 1"></index-msg-loop>
    <index-focus :cid="cid" v-if="cid" :key="loginKey"></index-focus>
    <div class="filters table">
      <div>
        <div class="">
          <div class="item" key="-1" @click="setCategory(-1)" :class="{active:activeCategoryIndex===-1}">全部</div>
          <div class="item" :class="{active:activeCategoryIndex===index}" v-for="(item,index) in category" :key="index"
          @click="setCategory(index)"><span>{{item.cate_name}}</span></div>
        </div>
      </div>
    </div>
    <load-more v-slot="{list}" class="list-wrap" :getData="getCategoryProducts" v-if="activeCategoryIndex >= 0" :key="activeCategoryIndex+loginKey">
      <div class="list clearfix">
        <index-goods-item class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item>
      </div>
    </load-more>
    <load-more v-slot="{list}" class="list-wrap" :getData="getDefaultProducts" v-else :key="key+loginKey">
      <div class="list clearfix">
        <index-goods-item class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item>
      </div>
    </load-more>
    <!-- 退出登录 非合伙才有 -->
    <div class="logout" v-if="isLogin && role !== 1" @click="logout">退出</div>
    <!-- 查看教程 -->
    <!-- <router-link class="how-to" to="/useDesc" tag="div">
      <div>使用</div>
      <div>说明</div>
    </router-link> -->
    <!-- 提示弹窗 -->
    <notice ref="notice" :autoClose="true"></notice>
    <confirm ref="confirm"></confirm>
    <new-people ref='newpeople'></new-people>
  </div>
</template>

<script>
import Notice from 'base/notice'
import Confirm from "base/confirm"
import SearchInput from 'base/ui/search-input'
import IndexTopCustomer from './index-top-customer'
import IndexMsgLoop from './index-msg-loop'
import IndexBanner from './index-banner'
import IndexFocus from './index-focus'
import newPeople from './newPeople'
import IndexGoodsItem from './index-goods-item'
import LoadMore from 'base/load-more'
import {Loading} from 'lib'
import {getCategory, getCategoryProducts, CustomerGetProducts, PartnerGetProducts,getNewbornZoneStore} from 'api'
import {invitePartner} from 'api/native'
import {mapState,mapMutations} from 'vuex'
import {login, logout} from 'api/login'

export default {
  components: {
    Confirm,
    Notice,
    LoadMore,
    SearchInput,
    IndexTopCustomer,
    IndexBanner,
    IndexMsgLoop,
    IndexFocus,
    IndexGoodsItem,
    newPeople
  },
  data() {
    return {
      key: 'empty',
      keyword: '',
      categoryList: [],
      activeCategoryIndex: -1
    }
  },
  computed: {
    ...mapState(['isLogin', 'role', 'userInfo','isFirst']),
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
    },
    loginKey() {
      return this.isLogin + ''
    }
  },
  watch: {
    keyword() {
      // 关键字改变，当为空的时候触发搜索全部
      if (this.keyword === '') {
        this.search()
      }
    },
    isLogin() {
      // 重置关键字和标签
      this.keyword = ''
      this.activeCategoryIndex = -1
      this.setFirst(true),
      this.$refs.newpeople.show(getNewbornZoneStore)
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
    ...mapMutations(['setFirst']),
    setCategory(i){
      console.log(i)
      if (i !== this.activeCategoryIndex) {
        this.activeCategoryIndex = i
      }
    },
    search() {
      console.log(this.keyword)
      if (this.keyword) {
        this.key = this.keyword
      } else {
        this.key = 'empty'
      }
    },
    invite() {
      Loading.open()
      invitePartner(this.userInfo.uid, this.userInfo.nickname).finally(() => {
        Loading.close()
      })
    },
    logout() {
      this.$refs.confirm.show('确定退出吗？', () => {
        logout()
      })
    }
  },
  beforeRouteLeave(to, from , next) {
    if (!this.isLogin && (to.path === '/order' || to.path === '/income')) {
      this.$refs.notice.show('请先登录', () => {
        login()
      })
      next(false)
    } else {
      next()
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
    // 原来是不撑满屏幕的
    margin-left: size(-20);
    margin-right: size(-20);
    height: size(224);
    position: relative;
    .banner{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: size(300);
      background: #fff;
      // border-radius: size(14);
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
  margin: size(12) 0;
  font-size: size(30);
  color: #595959;
  overflow: hidden;
  width: 100%;
  position: relative;
  >div{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 size(16);
  }
  >div>div{
    white-space: nowrap;
    overflow: scroll;
  }
  .item{
    display: inline-block;
    // min-width: 25%;
    text-align: center;
    line-height: size(72);
    padding: 0 size(20);
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
.logout{
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: size(156);
  background-color: #d8d8d8;
	box-shadow: 0px 1px 2px 0px rgba(207, 206, 206, 0.5);
	border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  font-size: size(24);
  color: #4d4d4d;
  padding: size(15) size(17);
  padding-left: size(10);
  // opacity: 0.71;
}
.how-to{
  position: fixed;
  right: size(20);
  bottom: size(164);
  @include circle(90);
  background-color: #eb0a0a;
	box-shadow: 0px 1px 5px 0px rgba(135, 135, 135, 0.5);
  color: #fff;
  text-align: center;
  font-size: size(24);
  line-height: 1.4;
  padding-top: size(12);
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