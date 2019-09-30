<template>
  <div class="list">
    <div class="item table" v-for="(item,index) in list" :key="index">
      <div class="head-wrap">
        <div class="head">
          <img :src="item.avatar" alt="">
        </div>
      </div>
      <div>
        <div class="who">{{item.nickname}}</div>
        <div class="what">{{item.store_name||goodsName}}</div>
      </div>
      <div class="nn">
        <div>
          <div class="time">{{item.pay_time}}</div>
          <div class="num">+{{item.total_num}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CustomerGetGoodsBuyRecords, PartnerGetGoodsBuyRecords} from 'api'
import {mapState} from 'vuex'
export default {
  props: ['id', 'goodsName'],
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['role'])
  },
  created() {
    const func = this.role === 1 ? PartnerGetGoodsBuyRecords : CustomerGetGoodsBuyRecords
    func(this.id).then(data => {
      if (data) {
        this.list = data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.list{
  padding: 0 size(24);
  background: #fff;
}
.item{
  background: #f9f9f9;
  height: size(108);
  border-radius: size(108/2);
  margin-bottom: size(20);
  padding-left: size(14);
  padding-right: size(48);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .head-wrap{
    width: size(98);
    .head{
      @include circle(98);
      border: 2px solid #fff;
      overflow: hidden;
      img{
        display: block;
        @include fill;
      }
    }
  }
  .who{
    font-size: size(30);
    padding-left: size(26);
    margin-bottom: size(18);
    @include txt-overflow;
  }
  .what{
    font-size: size(24);
    color: #999;
    padding-left: size(26);
    @include txt-overflow;
  }
  .nn{
    text-align: right;
    width: size(140);
  }
  .time{
    font-size: size(20);
    color:#999;
    margin-bottom: size(18);
  }
  .num{
    font-size: size(24);
    // color: #666;
    color: #ff0000;
  }
}
</style>