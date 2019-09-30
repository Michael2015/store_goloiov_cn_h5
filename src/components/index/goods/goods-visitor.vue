<template>
  <load-more v-slot="{list}" :getData="getGoodsVisitor">
    <div class="visitor clearfix">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="head-wrap"><img :src="item.avatar" alt=""></div>
        <div class="name">{{item.nickname}}</div>
      </div>
    </div>
  </load-more>
</template>

<script>
import LoadMore from 'base/load-more'
import {PartnerGetGoodsVisitor} from 'api'
export default {
  components: {
    LoadMore
  },
  props: ['id'],
  data () {
    return {
      list: []
    }
  },
  computed: {
    getGoodsVisitor() {
      return (page, size) => PartnerGetGoodsVisitor(this.id, page, size)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
$w : 750 - 40*2;
$l : p(($w - 100*5 - 3)/5/$w);
.visitor{
  padding: size(20) size(40);
  margin-left: -$l;
}
.item{
  float: left;
  width: p(100/$w);
  margin-left: $l;
  padding-bottom: size(24);
  .head-wrap{
    position: relative;
    padding-bottom: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: #ddd;
    img{
      position: absolute;
      left: 0;
      top: 0;
      @include fill;
    }
  }
  .name{
    text-align: center;
    @include txt-overflow;
    font-size: size(20);
    color: #666;
    height: size(42);
    line-height: size(42);
  }
}
</style>