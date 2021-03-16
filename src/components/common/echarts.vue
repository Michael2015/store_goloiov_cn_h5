<template>
  <div :ref="refName"
       class="echarts"></div>
</template>

<script>
import { Loading } from 'lib'
export default {
  components: {},
  props: {
    option: {
      type: Object,
      default: () => { }
    },
    refName: {
      type: String,
      default: () => 'echarts'
    }

  },
  data() {
    return {
      myChart: null
    };
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
      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
        this.myChart.dispose();
      }
      let element = this.$refs[this.refName];

      this.myChart = echarts.init(element);
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(val);
    }
  },
  mounted() {

  }
};
</script>
<style lang="scss" >
@import "~css/def";
.echarts {
  width: 90%;
  height: size(600);
  margin: 0 auto;
}
</style>
