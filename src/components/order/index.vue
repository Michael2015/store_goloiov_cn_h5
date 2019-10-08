<template>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="types">
          <div v-for="(item,index) in types" :key="index" 
            :class="{active: index===activeType }" @click="type(index)">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <order-item class="item" v-for="i in 2" :key="i"></order-item>
    </div>
  </div>
</template>

<script>
import OrderItem from './order-item'
export default {
  components: {
    OrderItem
  },
  data() {
    return {
      types: ['全部', '待付款', '待发货', '已发货', '退款'],
      activeType: 0,
      keyword: ''
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
.list{
  padding: size(26) 0 ;
  .item{
    margin-bottom: size(24);
  }
}
</style>