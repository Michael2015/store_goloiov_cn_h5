<template>
  <div ref="echarts"
       class="echarts"
       style="width: 100%;height:300px"></div>
</template>

<script>
let echarts = require('echarts');
export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {
    let element = this.$refs.echarts;
    let myChart = echarts.init(element);

    // 指定图表的配置项和数据
    let option = {
      xAxis: {
        type: 'category',
        data: ['13.00', '12.01', '13.02', '13.03', '13.04', '13.05', '13.06']
      },
      yAxis: {
        type: 'value',
        max: 15,
        axisLine: {
          show: true
        },
        axisLabel: {
          formatter: function (value, index) {
            return value.toFixed(2)
          }
        }
      },
      color: 'gray',
      series: [{
        data: [4.00, 5.00, 6.00, 1.00, 8.00, 9.00, 2.00],
        type: 'line',
        itemStyle: { normal: { label: { show: true } } }
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    setInterval(() => {
      option.series[0].data = Array.from({ length: 7 }, (ele, ind) => {
        return (Math.random() * 10).toFixed(2)
      })
      myChart.setOption(option);
    }, 3000)

  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
</style>