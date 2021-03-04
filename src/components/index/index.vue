<template>
  <div :class="[wrap,(isLogin && role === 1)?wrap_pad_bot:'']"
       ref="wrap">
    <div class="top-wrap">
      <div class="top"
           ref="top">
        <!-- 合伙人端 -->
        <div class="table table2"
             v-if="isLogin && role === 1">
          <div class="table-cell">
            <search-input v-model="keyword"
                          class="input"
                          @search="search"></search-input>
          </div>
          <div class="table-cell invite-wrap">
            <span class="invite"
                  @click="invite">邀请合伙人</span>
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
      <index-echarts />
      <!-- <div class="blank"><img src="~img/index-top-bg.png" alt=""></div> -->
    </div>
    <div>
      <index-msg-loop v-if="isLogin && role === 1"></index-msg-loop>
      <index-focus></index-focus>
    </div>

    <!--广告区-->
    <IndexAd></IndexAd>

    <!-- <div class="ht"><img src="~img/hot.png" /></div>-->
    <div class="rexiao">
      <img src="~img/rexiao.png" />
    </div>
    <load-more2 v-slot="{list}"
                class="list-wrap"
                :setSize="6"
                :getData="getCategoryProducts"
                :key="key+loginKey"
                :isShowMore="true"
                :fliter="'is_blast=1&name=爆品商品'">
      <div class="list clearfix"
           :style="{minHeight: `${topHeight}px`}">
        <index-goods-item class="item"
                          v-for="(item,index) in list.slice(0,6)"
                          :key="index"
                          :item="item"></index-goods-item>
      </div>
    </load-more2>

    <!-- <div class="ht"><img src="~img/all_goods.png" /></div> -->
    <!-- <div class="all_product_wrap" >
      <div v-for='(it,ind) in allArr' :key='ind'>
        <div class="all_goods_ad">广告区</div>
        <load-more
          v-slot="{list}"
          class="list-wrap2"
          :setSize="it.size"
          :getData="getCategoryProducts2"
          :key="key+loginKey+1"
          :isShowMore="false"
          :fliter="'name=全部商品'"
        >
          <div class="list1 clearfix all_pro" :style="{minHeight: `${topHeight}px`}">
            <index-goods-item2 class="item1" v-for="(item,index) in it.adListInfo.product" :key="index" :item="item"></index-goods-item2>
          </div>
          
          <div class="seeMore" v-if='it.showMore' @click='goMore($event,it.adListInfo)'>
            <img src="~img/more.png" />
          </div>
        </load-more>
      </div>
    </div>
    -->

    <load-more3 v-slot="{allArr}"
                ref="loadmore3">
      <div class="all_product_wrap">
        <div v-for="(it,ind) in allArr"
             :key="ind">
          <div class="all_goods_ad">
            <img :src="it.adListInfo.icon"
                 @click="goMore($event,it.adListInfo)" />
          </div>
          <div class="list1 clearfix all_pro"
               :style="{minHeight: `${topHeight}px`}">
            <index-goods-item2 class="item1"
                               v-for="(item,index) in it.adListInfo.product"
                               :key="index"
                               :item="item"></index-goods-item2>
          </div>
          <div class="seeMore"
               v-if="it.showMore"
               @click="goMore($event,it.adListInfo)">
            <img src="~img/more.png" />
          </div>
        </div>
      </div>
    </load-more3>
    <!-- 退出登录 非合伙才有 -->
    <div class="logout"
         v-if="isLogin && role !== 1"
         @click="logout">退出</div>
    <!-- 查看教程 -->
    <!-- <router-link class="how-to" to="/useDesc" tag="div">
      <div>使用</div>
      <div>说明</div>
    </router-link>-->
    <!-- 提示弹窗 -->
    <notice ref="notice"
            :autoClose="true"></notice>
    <confirm ref="confirm"></confirm>
    <new-people ref="newpeople"
                :newObj="newObj"
                :is_fisrt_pop="is_fisrt_pop"></new-people>
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
import IndexAd from "./index-ad";
import newPeople from "./newPeople";
import IndexGoodsItem from "./index-goods-item";
import IndexGoodsItem2 from "./index-goods-item2";
import indexEcharts from './echarts/echarts'
//import LoadMore from "base/load-more";
import LoadMore2 from "base/load-more2";
import LoadMore3 from "base/load-more3";
import { Loading } from "lib";
import {
  getPop,
  getCategory,
  PartnerGetProducts,
  CustomerGetProducts,
  PartnerGetBlastProducts,
  indexGetPop,
  CustomerGetBlastProducts,
  getAdv
} from "api";
import { invitePartner } from "api/native";
import { mapState, mapMutations } from "vuex";
import { login, logout } from "api/login";
import { appSource, getNowDate } from "lib";
//设备是IOS还是其他
let Phone = appSource();
export default {
  components: {
    Confirm,
    Notice,
    LoadMore2,
    LoadMore3,
    SearchInput,
    IndexTopCustomer,
    IndexBanner,
    IndexMsgLoop,
    IndexFocus,
    IndexGoodsItem,
    IndexAd,
    IndexGoodsItem2,
    newPeople,
    indexEcharts

  },
  data() {
    return {
      allArr: [],
      page: 0,
      busy: false,
      wrap: "wrap",
      wrap_pad_bot: "wrap_pad_bot",
      key: "empty",
      keyword: "",
      is_tab_fixed: false,
      categoryList: [],
      activeCategoryIndex: -1,
      topHeight: 480,
      flag: true,
      loadAll: false,
      newObj: [],
      is_fisrt_pop: true //是否是第一次弹框
    };
  },
  computed: {
    ...mapState([
      "isLogin",
      "role",
      "userInfo",
      "isFirst",
      "indexScrollTop",
      "token"
    ]),
    category() {
      return this.categoryList.slice(1);
    },
    cid() {
      return this.categoryList[0] && this.categoryList[0].id;
    },
    getCategoryProducts() {
      return () => {
        return this.role === 1
          ? PartnerGetBlastProducts(this.keyword, 1, 10)
          : CustomerGetBlastProducts(this.keyword, 1, 10);
      };
    },

    getCategoryProducts2() {
      return (page, limit) => {
        return this.role === 1
          ? PartnerGetProducts(page, limit)
          : CustomerGetProducts(page, limit);
      };
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
    isLogin(val) {
      // 重置关键字和标签
      this.keyword = "";
      this.activeCategoryIndex = -1;

      if (val) {
        this.isShowNewPeop();
      }
    }
  },

  created() {
    this.is_fisrt_pop = !localStorage.getItem("new_people_pop_" + getNowDate()); //是否是第一次弹框

    Loading.open();
    Promise.all([
      getCategory().then(data => {
        if (data) {
          this.categoryList = data;
        }
      }),
      getPop().then(data => {
        this.newObj = data;
      })
    ]).then(() => {
      Loading.close();
    });
  },
  destroyed() {
    this.$refs.wrap.removeEventListener("scroll", this.wrap_scroll, true);
  },
  mounted() {
    this.Phone = Phone;
    this.$nextTick(() => {
      this.$refs.wrap.addEventListener("scroll", this.wrap_scroll, true);
      if (Phone === "ios") {
        this.$refs.wrap.scrollTop = 1;
      }
      // 这里要得到top的距离和元素自身的高度
      this.loadMore_wrap();
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
      this.isShowNewPeop();
      this.topHeight = this.clientHeight - (this.offsetHeight + this.T_H + 100);
      this.$refs.wrap.scrollTop = this.indexScrollTop;
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
    ...mapMutations(["setFirst", "setIndexScrollTop"]),
    wrap_scroll(e) {
      if (e.target.scrollTop === 0) {
        if (Phone === "ios") {
          e.target.scrollTop = 1;
        }
      } else if (
        Math.floor(e.target.scrollTop) + e.target.offsetHeight ===
        e.target.scrollHeight
      ) {
        if (this.loadAll) {
          if (Phone === "ios") {
            e.target.scrollTop = e.target.scrollTop - 1;
          }
        } else {
          this.loadMore_wrap();
        }
      }
    },
    isShowNewPeop() {
      var time = new Date().getTime();

      if (!localStorage.getItem(this.token + "showNewPerson")) {
        this.setNewPersonTime(time);
      } else {
        if (Number(localStorage.getItem(this.token + "remain")) - time > 0) {
          if (Number(localStorage.getItem(this.token + "countTime") < 3)) {
            localStorage.setItem(
              this.token + "countTime",
              Number(localStorage.getItem(this.token + "countTime")) + 1
            );
            if (!this.$refs.newpeople.poplist.length) {
              this.$refs.newpeople.show(indexGetPop);
            } else {
              this.$refs.newpeople.is_show = true;
            }

            console.log(1);
          } else {
            this.$refs.newpeople.is_show = false;
            console.log(2);
          }
        } else {
          this.setNewPersonTime(time);
        }
      }
    },
    setNewPersonTime(time) {
      localStorage.setItem(this.token + "showNewPerson", true);
      localStorage.setItem(this.token + "remain", time + 1000 * 60 * 60 * 24);
      localStorage.setItem(this.token + "countTime", 1);
      //this.setFirst(true);
      this.$refs.newpeople.show(indexGetPop);
    },
    loadMore_wrap() {
      if (!this.busy) {
        this.busy = true;
        if (!this.loadAll) {
          this.$refs.loadmore3.loadMore();
        }
      }
    },
    goMore(e, adListInfo) {
      console.log(adListInfo);
      let { kind, url } = adListInfo;
      switch (kind) {
        case 1:
        case 2:
        case 3:
          this.$router.push(url);
          break;
        case 5:
          window.location.href = decodeURIComponent(url);
          break;
        default:
          break;
      }
    },
    getAdList() {
      getAdv(3, ++this.page).then(data => {
        if (data) {
          this.allArr = data.map(item => {
            return {
              adListInfo: item,
              size: 6,
              showMore: item.product.length >= 6 ? true : false
            };
          });
        }
      });
    },
    toLoadMore() {
      console.log(111);
      // this.getAdList();
      // this.allArr.push({size:6,showMore:true});
    },
    handleScroll(e) {
      //console.log(this.$refs.all_product_wrap.getBoundingClientRect())
      // 得到页面滚动的距离
      this.wrapScrollTop = e.target.scrollTop;
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
      this.key = this.$store.state.topNum + 1;
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
      this.$router.push({
        path: "/search",
        query: { name: this.keyword, keyword: this.keyword }
      });
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
    if (this.setIndexScrollTop) {
      if (to.path === "/order" || to.path === "/income" || to.path === "/me") {
        if (Phone === "ios") {
          this.setIndexScrollTop(1);
        } else {
          this.setIndexScrollTop(0);
        }
      } else {
        this.setIndexScrollTop(this.$refs.wrap.scrollTop);
      }
    }

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
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: size(100);
  //padding-bottom: size(20);
  box-sizing: border-box;
  background-color: $color-body-bg;
}
.wrap_pad_bot {
  padding-bottom: size(24);
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
.rexiao {
  height: size(130);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: size(255);
    height: size(53);
  }
}
.ht {
  padding: size(20);
  padding-top: 0;
  text-align: center;
  > img {
    width: 90%;
  }
}
.all_goods_ad {
  height: size(146);
  margin: size(20);
}
.all_goods_ad img {
  width: 100%;
  height: 100%;
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
    background: linear-gradient(
      167deg,
      rgba(254, 19, 25, 1) 0%,
      rgba(255, 143, 146, 1) 100%
    );
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
.list-wrap2 {
  margin-right: size(0);
  // min-height: size(1200);
}
.all_pro {
  margin-left: 0 !important;
}
.seeMore {
  height: size(62);
  line-height: size(62);
  text-align: center;
  img {
    width: size(110);
    height: size(30);
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 size(20);
  margin-left: -3%;
  .item {
    margin-bottom: size(20);
  }
}

//全部商品
.all_product_wrap {
  overflow: hidden;
  padding: 0 0 size(20) 0;
}
.list1 {
  display: flex;
  flex-wrap: wrap;
  padding: 0 size(20);
  margin-left: -3%;

  .item1 {
    width: 32%;
    margin-right: 2%;
    margin-bottom: 2%;
  }
  .item1:nth-child(3n) {
    margin-right: 0%;
  }
}
</style>