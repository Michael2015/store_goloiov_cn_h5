<template>
  <div class="load-more" >
    <slot :allArr='allArr'></slot>
    </div>
</template>
<script>
import {SIZE} from 'api/request'
import {
  getAdv
} from "api";
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
      allArr: [],
      page: 0,
      size: this.setSize, // 默认一页数量
    }
  },
  watch: {
    paused() {
     // this.loadMore()
    }
  },
  created(){
    // 设置默认值
    
    this.page=0;
    this.allArr=[];
    
    // 手动触发第一次加载
    //this.loadMore()

    
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
      this.$parent.busy=true;
     //console.log('s===============',this.allArr);
     getAdv(3,++this.page).then(data => {
      
      if (data) {
         this.$parent.busy=false;
        this.allArr.push(...data.map(item=>{
          return {
            adListInfo:item,
            size:6,
            showMore:item.product.length>=6?true:false
          }
        }))

      }
    });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~css/def";

.status-text,.lmore{
  padding: size(20) 0;
  line-height: 1.6;
  font-size: size(35);
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
.list{
  padding-bottom: 0!important;
}
</style>