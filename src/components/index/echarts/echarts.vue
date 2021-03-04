<template>
  <div ref="echarts"
       class="echarts"
       style="width: 100%;height:300px"></div>
</template>

<script>
let echarts = require('echarts');
export default {
  components: {},
  props: ['option'],
  data() {
    return {

    };
  },
  watch: {
    option: {
      handler(val) {
        this.setData(val)
      },
      deep: true
    }
  },
  methods: {
    setData(val) {
      let element = this.$refs.echarts;
      let myChart = echarts.init(element);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(val);
    }
  },
  mounted() {


  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
</style>