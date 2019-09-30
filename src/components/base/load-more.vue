<template>
  <div class="load-more" v-infinite-scroll="loadMore">
    <slot :list="list"></slot>
    <div class="status-text" v-if="loading">加载中...</div>
    <div class="status-text" v-if="loaded">{{page === 1 && list.length === 0 ? '暂无数据' : '没有更多了'}}</div>
  </div>
</template>

<script>
import {SIZE} from 'api/request'
export default {
  props: {
    getData: {
      Type: Function,
      default: null
    }
  },
  data() {
    return {
      disabled: false,
      loading: false,
      loaded: false,
      list: [],
      page: 1,
      size: SIZE // 默认一页数量
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
      if (this.disabled || this.loading || this.loaded) {
        return
      }
      this.loading = true
      this.getData(this.page, this.size).then(data => {
        if (data) {
          this.list.push(...data)
          if (data.length < this.size) {
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
.status-text{
  padding: size(20) 0;
  line-height: 1.6;
  font-size: size(24);
  text-align: center;
  color: #666;
}
</style>