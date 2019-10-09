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
    <load-more v-slot="{list}" class="list-wrap" :getData="getList" :key="activeType">
      <div class="list">
        <order-item class="item" v-for="(item, index) in list" :key="index" :item="item"></order-item>
      </div>
    </load-more>
  </div>
</template>

<script>
import OrderItem from './order-item'
import {getOrderList} from 'api/order'
import LoadMore from 'base/load-more'
export default {
  components: {
    OrderItem,
    LoadMore
  },
  data() {
    return {
      types: [{name: '全部', type: ''}, {name: '待付款', type: 0}, {name: '待发货', type: 1}, {name: '已发货', type: 2}, {name: '退款', type: -3}],
      activeType: 0,
      keyword: ''
    }
  },
  computed: {
    getList() {
      return (page, size) => getOrderList(this.types[this.activeType].type, page, size)
    }
  },
  created() {
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
  padding: 0 size(20);
  overflow: hidden;
  background: #fff;
  .types{
    font-size: size(30);
    display: flex;
    // justify-content: space-around;
    >div{
      flex: 1;
      padding: size(44) 0;
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
  padding-bottom: size(100);
}
.list{
  padding: size(26) 0 ;
  .item{
    margin-bottom: size(24);
  }
}
</style>