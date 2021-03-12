<template>
  <div ref="echarts"
       class="echarts"></div>
</template>

<script>
export default {
  components: {},
  props: ["option"],
  data() {
    return {};
  },
  watch: {
    option: {
      handler(val) {
        this.setData(val);
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
  mounted() { }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.echarts {
  width: 90%;
  height: size(600);
  margin: 0 auto;
}
</style>
