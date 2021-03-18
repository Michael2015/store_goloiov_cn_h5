<template>
  <div class="index">
    <Clock />
    <div class="margin">
      <index-banner></index-banner>
      <Info />
      <tab-list @current-change='change'
                :tab='tab'>
        <template v-slot:list0>
          <div>
            <my-charts :option="option"
                       refName='list0'
                       key="list0">
              <tip></tip>
            </my-charts>
          </div>
        </template>
      </tab-list>
      <indexGoodsItem></indexGoodsItem>
    </div>
  </div>
</template>

<script>
import indexBanner from './index-banner'
import Clock from './index-clock'
import Info from './index-info'
import myCharts from "com/common/echarts";
import tabList from "com/index/tab-list";
import indexGoodsItem from 'com/index/index-goods-item'
import tip from 'com/index/index-tip'

export default {
  components: {
    indexBanner, Clock, Info, myCharts, tip, tabList, indexGoodsItem
  },
  data() {
    return {
      option: {},
      current: 0,
      tab: ['分钟', '小时', '日K', '周K', '年K'],
      goodsPrice: ''
    };
  },
  methods: {
    change(e) {

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
          text: "",
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
@mixin line($h) {
  height: size($h);
  background: #f6f6f6;
  margin: size(44) 0;
}
.index {
  background: #f7f7f7;
  padding-bottom: size(166);
  .margin {
    margin: 0 size(20);
  }
  .suanfa {
    font-size: size(20);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b2b6bf;
    line-height: size(32);
    margin: 0 size(40);
    text-align: justify;
  }
}
</style>