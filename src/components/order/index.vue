<template>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="types">
          <div v-for="(item,index) in types" :key="index" 
            :class="{active: index===activeType }" @click="type(index)">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="!isLogin">暂无数据</div>
    <load-more v-else v-slot="{list}" class="list-wrap" :getData="getList" :key="activeType + '-' + triggerRefresh">
      <div class="list">
        <order-item class="item" v-for="(item) in list" :key="item.id" :item="item"></order-item>
      </div>
    </load-more>
  </div>
</template>

<script>
import OrderItem from './order-item'
import {getOrderList} from 'api/order'
import LoadMore from 'base/load-more'
import {mapState} from 'vuex'
export default {
  components: {
    OrderItem,
    LoadMore
  },
  data() {
    return {
      types: [{name: '全部', type: ''}, {name: '待付款', type: 0}, {name: '待发货', type: 1}, {name: '已发货', type: 2}, {name: '退款', type: -3}],
      activeType: 0,
      keyword: '',
      triggerRefresh: 0,
    }
  },
  computed: {
    ...mapState(['isLogin']),
    getList() {
      return (page, size) => getOrderList(this.types[this.activeType].type, page, size)
    }
  },
  watch: {
    isLogin() {
      this.triggerRefresh++
    }
  },
  created() {
  },
  activated() {
    const params = this.$route.params
    if (params.refresh) {
      // 触发组件重新创建 从而刷新数据
      this.activeType = 0
      this.triggerRefresh++
      // 清除刷新标志，为了从订单详情回到列表，列表不刷新
      delete params.refresh
      this.$router.push({
        params
      })
    }
  },
  methods: {
    type(i) {
      this.activeType = i
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
.top{
  padding: 0 size(16);
  overflow: hidden;
  background: #fff;
  position: fixed;
  width: 100%;
  z-index: 9;
  box-shadow: 1px 0 2px 1px rgba(0, 0, 0, .06);
  .types{
    font-size: size(30);
    display: flex;
    // justify-content: space-around;
    >div{
      flex: 1;
      padding: size(28) 0;
      line-height: size(40);
      text-align: center;
      color: #000;
      &.active{
        position: relative;
        color: #e4193a;
        &:after{
          content: ' ';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          background: #e31436;
          display: block;
          width: 72%;
        }
      }
    }
  }
}
.list-wrap{
  padding-top: size(96);
  padding-bottom: size(100);
}
.list{
  padding: size(26) 0 ;
  .item{
    margin-bottom: size(24);
  }
}
.no-data{
  padding: size(20) 0;
  padding-top: size(96 + 50);
  line-height: 1.6;
  font-size: size(24);
  text-align: center;
  color: #666;
}
</style>