<template>
  <div class="index">

    <Clock />
    <Info />
    <tab-list @current-change='change'
              :tab='tab'>
      <template v-slot:list0>
        <div>
          <my-charts :option="option"
                     refName='list0'
                     key="list0" />
        </div>
      </template>
      <template v-slot:list1>
        <div>
          <my-charts :option="option"
                     refName='list1'
                     key="list1" />
        </div>
      </template>
      <template v-slot:list2>
        <div>
          <my-charts :option="option"
                     refName='list2'
                     key="list2" />
        </div>
      </template>
      <template v-slot:list3>
        <div>
          <my-charts :option="option"
                     refName='list3'
                     key="list3" />
        </div>
      </template>
      <template v-slot:list4>
        <div>
          <my-charts :option="option"
                     refName='list4'
                     key="list4" />
        </div>
      </template>
    </tab-list>

  </div>
</template>

<script>
import Clock from './index-clock'
import Info from './index-info'
import myCharts from "com/common/echarts";
import tabList from "com/base/tab-list";

export default {
  components: {
    Clock, Info, myCharts, tabList
  },
  data() {
    return {
      option: {},
      current: 0,
      tab: ['分钟', '小时', '日K', '周K', '年K']
    };
  },
  methods: {
    change(e) {
      console.log(e)
    },
    echartsInit() {
      this.option = {
        xAxis: {
          type: "category",
          data: ["13.00", "12.01", "13.02", "13.03", "13.04", "13.05", "13.06"]
        },
        yAxis: {
          type: "value",
          max: 15,
          axisLine: {
            show: true,
            symbol: ["none", "arrow"],
            symbolSize: [5, 10],
            symbolOffset: [0, 8]
          },
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(2);
            }
          }
        },
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "主标题",
          left: "center",
          top: "20",
          textStyle: {
            fontSize: 14,
            top: 30
          }
        },
        color: "#ED3E48",
        series: [
          {
            data: [4.0, 5.0, 6.0, 1.0, 8.0, 9.0, 2.0],
            type: "line",
            label: {
              position: 'top'
            }
          }
        ]
      };

      this.timer = setInterval(() => {
        this.option.series[0].data = Array.from({ length: 7 }, (ele, ind) => {
          return (Math.random() * 10).toFixed(2);
        });
      }, 3000);
    },
  },
  mounted() {

  },
  activated() {
    this.echartsInit()
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>
<style lang='scss' scoped>
@import "~css/def";
</style>