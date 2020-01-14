<template>
  <div class="load-more" v-infinite-scroll="loadMore">
    <div class="status-text" v-if="loading">加载中...</div>
    <div class="no-data" v-else-if="list.length === 0">
      <img src="~img/no_data.png" alt="">
      <div class="status-text">暂无数据</div>
    </div>
    <slot :list="list"></slot>
    <keep-alive>
      <router-link tag="div" v-if="isShowMore && list.length > setSize" class="lmore" :to="{path:'/search?'+fliter}" :key="$route.fullPath">加载更多>></router-link>
    </keep-alive>
    <!--
    <div class="status-text" v-if="loaded">{{page === 1 && list.length === 0 ? '' : '没有更多了'}}</div>
    -->
  </div>
</template>

<script>
import {SIZE} from 'api/request'
export default {
  props: {
    getData: {
      type: Function,
      default: null
    },
    setSize:{
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
     fliter: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      disabled: false,
      loading: false,
      loaded: false,
      list: [],
      page: 1,
      size: this.setSize, // 默认一页数量
    }
  },
  watch: {
    paused() {
      this.loadMore()
    }
  },
  created(){
    // 设置默认值
    this._disabled = null
    if (!this.getData) {
      this.disabled = true
    }
    // 手动触发第一次加载
    this.loadMore()
  },
  activated() {
    // 激活时恢复
    if (this._disabled !== null) {
      this.disabled = this._disabled
      this._disabled = null
    }
  },
  deactivated() {
    // 非激活时禁用
    this._disabled = this.disabled
    this.disabled = true
  },
  methods: {
    loadMore() {
      if (this.disabled || this.loading || this.loaded || this.paused) {
        return
      }
      this.loading = true
      this.getData(this.page, this.size).then(data => {
        if ( this.size == 0) {
          this.list = data
          this.loading = false
          this.loaded = true
          return
        }
        if (data) {
          this.list.push(...data)
          if (data.length < this.size || this.isShowMore) {
            this.loaded = true
          } else {
            this.page++
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~css/def";
.status-text,.lmore{
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