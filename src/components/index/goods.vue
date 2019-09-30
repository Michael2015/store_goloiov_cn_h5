<template>
  <div>
    <!-- 商品详情页面统一入口 商品详情 分为合伙人端 和 客户端-->
    <!-- 合伙人 -->
    <goods-partner :id="id" v-if="role === 1"></goods-partner>
    <!-- 客户端 或者 没登录时 --->
    <goods-customer :id="id" v-else></goods-customer>
  </div>
</template>

<script>
import GoodsPartner from './goods/goods-partner'
import GoodsCustomer from './goods/goods-customer'
import {mapState} from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    GoodsPartner,
    GoodsCustomer
  },
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style lang="scss" scoped>
</style>