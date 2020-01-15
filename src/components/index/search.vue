<template>
  <div class="wrap">
    <top-head>搜索</top-head>
    <div class="top-wrap">
      <div class="top" ref="top">
        <!-- 合伙人端 -->
        <div class="table">
          <div class="table-cell">
            <search-input
              v-model="keyword"
              class="input"
              @search="search"
              :placeholder="placeholder"
            ></search-input>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-navbar">
      <ul>
        <li :class="{active:active_tab == 1}" @click="tab(1,order_sort,'order')">人气</li>
        <li :class="{active:active_tab == 2}" @click="tab(2,order_sort,'sales')">销量</li>
        <li :class="{active:active_tab == 3}" @click="showPrice">
          价格
          <em v-if="price_type == 2">
            <img src="~img/search_up.png" />
          </em>
          <em v-if="price_type == 1">
            <img src="~img/search_down.png" />
          </em>
        </li>
      </ul>
      <div class="select-price" v-if="isMaskShow">
        <div class="select-price-mask"></div>
        <div :class="{active:sort_price == 1}" @click="select_price(1)">
          价格从高到低
          <em v-if="sort_price == 1">√</em>
        </div>
        <div :class="{active:sort_price == 2}" @click="select_price(2)">
          价格从低到高
          <em v-if="sort_price == 2">√</em>
        </div>
      </div>
    </div>
    <div class="list-wrap">
      <div class="list clearfix" :style="{minHeight: `${topHeight}px`}" v-if="list.length > 0">
        <index-goods-item class="item" v-for="(item,index) in list" :key="index" :item="item"></index-goods-item>
      </div>
      <div class="no-data" >
         <img src="~img/no_data.png" alt="">
      <div class="status-text">暂无数据</div>
    </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "base/ui/search-input";
import IndexGoodsItem from "./index-goods-item";
import { mapState, mapMutations } from "vuex";
import {
  PartnerGetBlastProducts,
  CustomerGetBlastProducts
} from "api";
export default {
   props: {
    fliter: {
      type: String,
      default: ''
    }
  },
  components: {
    SearchInput,
    IndexGoodsItem
  },
  data() {
    return {
      key: "empty",
      keyword: "",
      is_tab_fixed: false,
      categoryList: [],
      activeCategoryIndex: -1,
      topHeight: 480,
      flag: true,
      isMaskShow:false,
      price_type:1,
      active_tab:1,
      order_sort:'desc',
      order_field:'order',
      placeholder:'',
      list:[],
      sort_price:1,
      cate_id:0,
    };
  },
  computed: {
     ...mapState(["role","userInfo"]),
    category() {
      return this.categoryList.slice(1);
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
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    this.placeholder = this.$route.query.name;
    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : '';
    this.getProducts();
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
    this.top = 1;
  },
  methods: {
    ...mapMutations(["setFirst"]),
    getProducts() {
      var is_blast = this.$route.query.is_blast ? 1 : 0;
      var cate_id = this.$route.query.cate_id ? this.$route.query.cate_id : 0;
        if(this.role === 1)
        {
            PartnerGetBlastProducts(this.keyword,is_blast,10000,this.order_field,this.order_sort,cate_id).then(data=>{
              this.list = data;
            });
        }
        else{
            CustomerGetBlastProducts(this.keyword,is_blast,10000,this.order_field,this.order_sort,cate_id).then(data=>{
              this.list = data;
            });
        }
        this.isMaskShow = false;
    },
    //显示价格
    showPrice()
    {
      this.active_tab = 3;
      this.isMaskShow = !this.isMaskShow;
      this.price_type = this.price_type == 1 ? 2 : 1;
      
    },
    //切换tab
    tab(index,order_sort,order_field){
      this.order_sort = order_sort == 'desc' ? 'asc' : 'desc';
      this.order_field = order_field,
      this.active_tab = index;
      this.getProducts();
    },
    //选择价格
    select_price(sort)
    {
      this.order_field = 'price';
      this.order_sort = sort == 2 ? 'asc' : 'desc';
      this.sort_price = sort;
      this.getProducts();
    },
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
      this.getProducts();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.list-wrap {
  margin-top: size(150);
  padding: 0 size(20) size(130) size(20);
}
.wrap {
  min-height: 100vh;
  background-color: $color-body-bg;
}
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: size(90);
  background: linear-gradient(to right, #ff090b, #fe3847);
  padding: 0 size(20);
  z-index: 99;
  .table {
    padding-top: size(15);
    height: size(64);
    // margin-bottom: size(10);
  }
  .input {
    height: size(64);
  }
}
.sc-navbar {
  position: fixed;
  width: 100%;
  top: size(90);
  z-index: 99;
  font-size: size(30);
  background: #f9f9f9f9;
}
.sc-navbar ul {
  display: flex;
  height: size(80);
  line-height: size(80);
  margin: size(30) 0;
  padding: 0 size(20);
  > li {
    flex: 1;
    text-align: center;
    color: #999;
    em {
      vertical-align: middle;
      >img{
        margin-top:size(20);
      }
    }
  }
  .active {
    color: #000;
  }
}
.select-price {
  position: absolute;
  bottom: size(-180);
  width: 100%;
  z-index: 9;
  background: #f9f9f9f9;
  > .select-price-mask {
    background: #000;
    opacity: 0.6;
    position: absolute;
    top: size(180);
    height: 100vh;
    width: 100%;
    z-index: 200;
  }
  > div {
    padding: 0 size(20);
    height: size(90);
    line-height: size(90);
    border-top: size(1) solid #f0f0f0;
    color: #999;

    > em {
      float: right;
    }
  }
  > .active {
    color: #000;
    em {
      color: #ff090b;
      font-weight: bold;
    }
  }
}

.list {
  margin-left: -3%;
  .item {
    float: left;
    margin-bottom: size(18);
  }
}
.status-text{
  padding: size(20) 0;
  line-height: 1.6;
  font-size: size(24);
  text-align: center;
  color: #888;
}
.no-data{
  width: size(260);
  margin: size(20) auto;
  img{
    width: 100%;
  }
}
</style>