<template>
  <div class="wrap">
    <div class="top-wrap">
      <div class="top" ref="top">
        <!-- 合伙人端 -->
        <div class="table table2" v-if="isLogin && role === 1">
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
      </div>
      <div class="banner-wrap">
        <div class="banner">
          <index-banner></index-banner>
        </div>
      </div>
      <!-- <div class="blank"><img src="~img/index-top-bg.png" alt=""></div> -->
    </div>
    <div>
      <index-msg-loop v-if="isLogin && role === 1"></index-msg-loop>
      <index-focus></index-focus>
    </div>
    <div class="ht"><img src="~img/hot.png" /></div>
    <load-more2
      v-slot="{list}"
      class="list-wrap"
      :setSize="8"
      :getData="getCategoryProducts"
      :key="key+loginKey"
      :isShowMore="true"
      :fliter="'is_blast=1&name=爆品商品'"
    >
      <div class="list clearfix" :style="{minHeight: `${topHeight}px`}">
        <index-goods-item class="item" v-for="(item,index) in list.slice(0,8)" :key="index" :item="item" ></index-goods-item>
      </div>
    </load-more2>
    <div class="ht"><img src="~img/all_goods.png" /></div>
    <load-more
      v-slot="{list}"
      class="list-wrap2"
      :setSize="20"
      :getData="getCategoryProducts2"
      :key="key+loginKey+1"
      :isShowMore="false"
      :fliter="'name=全部商品'"
    >
      <div class="list clearfix" :style="{minHeight: `${topHeight}px`}">
        <index-goods-item2 class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item2>
      </div>
    </load-more>
    <!-- 退出登录 非合伙才有 -->
    <div class="logout" v-if="isLogin && role !== 1" @click="logout">退出</div>
    <!-- 查看教程 -->
    <!-- <router-link class="how-to" to="/useDesc" tag="div">
      <div>使用</div>
      <div>说明</div>
    </router-link>-->
    <!-- 提示弹窗 -->
    <notice ref="notice" :autoClose="true"></notice>
    <confirm ref="confirm"></confirm>
    <new-people ref="newpeople"></new-people>
  </div>
</template>

<script>
import Notice from "base/notice";
import Confirm from "base/confirm";
import SearchInput from "base/ui/search-input";
import IndexTopCustomer from "./index-top-customer";
import IndexMsgLoop from "./index-msg-loop";
import IndexBanner from "./index-banner";
import IndexFocus from "./index-focus";
import newPeople from "./newPeople";
import IndexGoodsItem from "./index-goods-item";
import IndexGoodsItem2 from "./index-goods-item2";
import LoadMore from "base/load-more";
import LoadMore2 from "base/load-more2";
import { Loading } from "lib";
import {
  getCategory,
  PartnerGetProducts,
  CustomerGetProducts,
  PartnerGetBlastProducts,
  getNewbornZoneStore,
  CustomerGetBlastProducts
} from "api";
import { invitePartner } from "api/native";
import { mapState, mapMutations } from "vuex";
import { login, logout } from "api/login";

export default {
  components: {
    Confirm,
    Notice,
    LoadMore,
    LoadMore2,
    SearchInput,
    IndexTopCustomer,
    IndexBanner,
    IndexMsgLoop,
    IndexFocus,
    IndexGoodsItem,
    IndexGoodsItem2,
    newPeople
  },
  data() {
    return {
      key: "empty",
      keyword: "",
      is_tab_fixed: false,
      categoryList: [],
      activeCategoryIndex: -1,
      topHeight: 480,
      flag: true
    };
  },
  computed: {
    ...mapState(["isLogin", "role", "userInfo", "isFirst"]),
    category() {
      return this.categoryList.slice(1);
    },
    cid() {
      return this.categoryList[0] && this.categoryList[0].id;
    },
    getCategoryProducts() {
      return () => {
        return this.role === 1 ? PartnerGetBlastProducts(this.keyword,1,10) : CustomerGetBlastProducts(this.keyword,1,10);
      }
    },

    getCategoryProducts2() {
      return (page,limit) => {
        return this.role === 1? PartnerGetProducts(page,limit) : CustomerGetProducts(page,limit);
      }
    },

    loginKey() {
      return this.isLogin + "";
    }
  },
  watch: {
    keyword() {
      // 关键字改变，当为空的时候触发搜索全部
      if (this.keyword == "") {
        this.search();
      }
    },
    isLogin() {
      // 重置关键字和标签
      this.keyword = "";
      this.activeCategoryIndex = -1;
      this.setFirst(true), this.$refs.newpeople.show(getNewbornZoneStore);
    }
  },
  created() {
    Loading.open();
    Promise.all([
      getCategory().then(data => {
        if (data) {
          this.categoryList = data;
        }
      })
    ]).then(() => {
      Loading.close();
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 这里要得到top的距离和元素自身的高度
      let header = this.$refs.filters_tab;
      this.offsetTop = header.offsetTop;
      this.offsetHeight = header.offsetHeight;
      // 获取浏览器可视区域高度
      this.clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      // 获取元素
      this.T_H = this.$refs.top.offsetHeight;
      this.tab_left = this.$refs.tab_left;
    });
  },
  activated() {
    this.$nextTick(() => {
      this.topHeight = this.clientHeight - (this.offsetHeight + this.T_H + 100);
    });
    window.addEventListener("scroll", this.handleScroll, true);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll, true);
    clearTimeout(this.timer);
    // 初始化参数，避免bug
    this.topHeight = 0;
    this.is_tab_fixed = false;
    this.$store.commit("topNum", 0);
    this.flag = true;
    this.top = 0;
  },
  methods: {
    ...mapMutations(["setFirst"]),
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.top = scrollTop;
      let scale = this.offsetTop + this.offsetHeight * 2 - Number(this.T_H / 2);
      if (this.top >= scale && this.flag) {
        this.$store.commit("topNum", this.clientHeight - this.topHeight + 100);
        this.flag = false;
      }
      this.is_tab_fixed = this.top >= scale;
      this.key = this.$store.state.topNum+1;
    },
    setCategory(i) {
      if (i !== this.activeCategoryIndex) {
        this.activeCategoryIndex = i;
        this.key = i;
      }
      // 如果达到吸顶的位置
      if (this.is_tab_fixed) {
        window.scrollTo(0, this.$store.state.topNum);
      } else {
        window.scrollTo(0, this.top);
      }
      this._scroll_animation(this.tab_left, 30 * i, 80);
    },
    _scroll_animation(element, to, duration) {
      if (duration <= 0) return;
      const diff = to - element.scrollLeft;
      const perTick = (diff / duration) * 10;
      this.timer = setTimeout(() => {
        element.scrollLeft += perTick;
        if (element.scrollLeft === to) return;
        this._scroll_animation(element, to, duration - 10);
      }, 10);
    },
    search() {
      //this.key = this.keyword ? this.keyword : "empty";
      this.$router.push({path:'/search',query:{name:this.keyword,keyword:this.keyword}});
    },
    invite() {
      Loading.open();
      invitePartner(this.userInfo.uid, this.userInfo.nickname).finally(() => {
        Loading.close();
      });
    },
    logout() {
      this.$refs.confirm.show("确定退出吗？", () => {
        logout();
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isLogin && (to.path === "/order" || to.path === "/income")) {
      this.$refs.notice.show("请先登录", () => {
        login();
      });
      next(false);
    } else {
      next();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
}
.top-wrap {
  position: relative;
  padding-top: size(90);
  .blank {
    height: size(78);
    position: relative;
    img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
}
.ht{
  padding: size(20);
  padding-top: 0;
  text-align: center;
  >img{
    width: 90%;
  }
}
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: size(90);
  background: linear-gradient(to right, #ff090b, #fe3847);
  padding: 0 size(20);
  z-index: 99;
  .banner-wrap {
    // margin-top: size(90);
    // 原来是不撑满屏幕的
    margin-left: size(-20);
    margin-right: size(-20);
    height: size(224);
    position: relative;
    .banner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: size(300);
      background: #fff;
      // border-radius: size(14);
      overflow: hidden;
      z-index: 1;
    }
  }
  .table2 {
    margin-top: size(13);
    height: size(64);
  }
  .input {
    height: size(64);
  }
  .invite-wrap {
    text-align: right;
    width: size(180);
  }
  .invite {
    color: #fff;
    font-size: size(20);
    line-height: size(60);
    height: size(60);
    min-width: size(154);
    padding: 0 size(12);
    // margin-left: size(20);
    display: inline-block;
    background:linear-gradient(167deg,rgba(254,19,25,1) 0%,rgba(255,143,146,1) 100%);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    text-align: center;
  }
  .parent-avatar {
    width: size(72);
    height: size(72);
    border-radius: 5px;
    float: left;
    background: #ddd;
  }
  .shop-name {
    vertical-align: middle;
    float: left;
    line-height: size(72);
    font-size: size(38);
    color: #fff;
    margin-left: size(22);
  }
}
.filters {
  text-align: center;
  height: size(72);
  margin: size(12) 0;
  font-size: size(30);
  color: #595959;
  overflow: hidden;
  width: 100%;
  position: relative;
  // transition: all 0.4s;
  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 size(16);
  }
  > div > div {
    white-space: nowrap;
    overflow: scroll;
  }
  &.tab_fixed {
    position: fixed;
    top: size(86);
    margin-top: size(-1);
    z-index: 100;
    background: linear-gradient(to right, #ff090b, #fe3847);
    .item {
      color: #eee;
      &.active {
        color: #fff;
        &:after {
          content: " ";
          height: size(4);
          background-color: #fff;
        }
      }
    }
  }
  .item {
    display: inline-block;
    // min-width: 25%;
    text-align: center;
    line-height: size(72);
    padding: 0 size(20);
    &.active {
      font-size: size(32);
      color: #252525;
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        left: 50%;
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
.logout {
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
}
.how-to {
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
.list-wrap2{
  padding:0 size(20) size(120) 0; 
  margin-right:size(0);
  // min-height: size(1200);
}
.list {
  padding: 0 size(20);
  margin-left: -3%;
  .item {
    float: left;
    margin-bottom: size(18);
  }
}
</style>