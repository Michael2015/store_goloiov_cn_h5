<template>
  <div>
  <div class="wrap">
    <div class="top top-spec-bg">
      <div>
        <search-input v-model="keyword" class="input"></search-input>
        <div class="types">
          <div v-for="(item,index) in types" :key="index" 
            :class="{active: index===activeType }" @click="type(index)">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <order-item class="item" v-for="i in 2" :key="i"></order-item>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Tab from 'base/tab'
import SearchInput from 'base/ui/search-input'
import OrderItem from './order-item'
export default {
  components: {
    Tab,
    SearchInput,
    OrderItem
  },
  data() {
    return {
      types: ['全部订单', '待发货', '已发货', '退款/售后'],
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
  padding: 0 size(24);
  overflow: hidden;
  .input{
    margin: size(36) 0 0;
  }
  .types{
    font-size: size(30);
    color: #fff;
    display: flex;
    justify-content: space-around;
    >div{
      padding: size(44) 0;
      &.active{
        font-weight: 800;
        position: relative;
        &:after{
          content: ' ';
          position: absolute;
          left: 50%;
          bottom: size(27);
          transform: translateX(-50%);
          height: 2px;
          background: #fff;
          display: block;
          width: 60%;
        }
      }
    }
  }
}
.list{
  padding: size(26);
  .item{
    margin-bottom: size(24);
  }
}
</style>