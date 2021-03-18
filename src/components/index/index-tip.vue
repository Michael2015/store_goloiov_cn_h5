<template>
  <div class="tip"
       @click='extend=!extend'>
    <div class="content"
         :class="extend?'extend':'no-extend'"><span class="bold">*价格波动说明：</span>以24小时（1440分钟）为时间区间，计算任何时刻提货券价格。假定当前的前1440分钟平均价格P1，时间区间T1，T1之前1440分钟平均价格为P2,时间区间T2；那么当前价格P3=D1*0.5*T1销量/T2销量，D2不可为0，初始值1。

      P3最低值为4，不设上限</div>
    <div class="icon">
      <i class="iconfont"
         v-show='!extend'>&#xe654;</i>
      <i class="iconfont"
         v-show='extend'>&#xe626;</i>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      extend: false
    };
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
.tip {
  padding: size(20);
  margin-top: size(40);
  border-top: 2px solid #f7f7f7;
  .content {
    opacity: 0.5;
    font-size: size(20);
    font-weight: 400;
    color: #666666;
    text-align: justify;
    line-height: 1.5;
    .bold {
      font-weight: bold;
      white-space: wrap;
    }
  }

  .no-extend {
    @include txt-overflow(1);
  }
  .icon {
    text-align: center;
    opacity: 0.5;
    .iconfont {
      font-size: size(24);
      font-weight: bold;
    }
  }
}
</style>