<template>
  <div class="load-more" v-infinite-scroll="loadMore">
    <slot :list="list"></slot>
    <div class="status-text" v-if="loading">加载中...</div>
    <div class="no-data" v-else-if="list.length === 0">
      <img src="~img/no_data.png" alt="" />
      <div class="status-text">暂无数据</div>
    </div>
    <div class="status-text" v-else>已加载全部</div>
  </div>
</template>
<script>
import { SIZE } from "api/request";
import { Toast, Loading } from "lib";

export default {
  props: {
    getData: {
      type: Function,
      default: null
    },
    setSize: {
      type: Number,
      default: SIZE
    },
    paused: {
      type: Boolean,
      default: false
    },
    isShowMore: {
      type: Boolean,
      default: false
    },
    isAppearScroll: {
      type: Boolean,
      default: true
    },
    fliter: {
      type: String,
      default: ""
    },
    useListName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      disabled: false,
      loading: false,
      loaded: false,
      list: [],
      page: 1,
      size: this.setSize // 默认一页数量
    };
  },
  watch: {
    paused() {
      this.loadMore();
    }
  },
  created() {
    // 设置默认值
    this._disabled = null;
    if (!this.getData) {
      this.disabled = true;
    }
    // 手动触发第一次加载
    this.loadMore();
  },
  activated() {
    // 激活时恢复
    if (this._disabled !== null) {
      this.disabled = this._disabled;
      this._disabled = null;
    }
  },
  deactivated() {
    // 非激活时禁用
    this._disabled = this.disabled;
    this.disabled = true;
  },
  mounted() {
    window.addEventListener("scroll", this.handler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handler);
  },
  computed: {
    //判断是否出现了滚动条，若没有，说明还未撑满屏幕，继续加载到出现滚动条或者加载完数据为止
    hasScrollbar() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      return scrollHeight >= clientHeight;
    }
  },
  methods: {
    handler() {
      this.scrollTop = Math.ceil(
        window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
      );
      this.clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      this.scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //监听触底，手动loadMore，安卓有些设备触底不触发loadMore
      if (
        this.scrollTop + this.clientHeight >= this.scrollHeight &&
        !this.loading
      ) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.disabled || this.loading || this.loaded || this.paused) {
        return;
      }
      Loading.open();
      this.loading = true;
      this.getData(this.page, this.size)
        .then(data => {
          //这里要判断返回的data是不是数组，有些返回的是对象需要处理
          let list = this.useListName ? data[this.useListName] : data;
          if (this.useListName) {
            this.$emit("getResData", JSON.parse(JSON.stringify(data)));
          }
          if (this.size == 0) {
            this.list = list;
            this.loading = false;
            this.loaded = true;
            return;
          }
          if (list) {
            this.list.push(...list);
            if (list.length < this.size || this.isShowMore) {
              this.loaded = true;
            } else {
              this.page++;
            }
            this.loading = false;
          }
        })
        .finally(() => {
          Loading.close();
          //若未出现滚动条，继续加载loadmore
          if (this.isAppearScroll && !this.loaded && !this.hasScrollbar) {
            this.loadMore();
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.status-text,
.lmore {
  padding: size(20) 0;
  line-height: 1.6;
  font-size: size(24);
  text-align: center;
  color: #888;
}
.no-data {
  width: size(260);
  margin: size(20) auto;
  img {
    width: 100%;
  }
}
.list {
  padding-bottom: 0 !important;
}
</style>
