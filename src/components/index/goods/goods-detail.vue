<template>
  <div>
    <!-- 商品下面的图文详情页面 -->
    <div v-html="all.description" id="goodsDesc"></div>
  </div>
</template>

<script>
import {CustomerGetGoodsDesc, PartnerGetGoodsDesc} from 'api'
import {mapState} from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      all: {}
    }
  },
  computed: {
    ...mapState(['role'])
  },
  created() {
    const func = this.role === 1 ? PartnerGetGoodsDesc : CustomerGetGoodsDesc
    func(this.id).then(data => {
      if (data) {
        this.all = data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
#goodsDesc{
  padding: 0 size(20);
}
</style>

<style>
#goodsDesc img{
  width: 100%;
}
</style>
