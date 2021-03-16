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
      <template v-slot:bott>
        <div class="suanfa">*价格波动算法：以24小时（1440分钟）为时间区间，计算任何时刻提货券价格。假定当前的前1440分钟平均价格P1，时间区间T1，T1之前1440分钟平均价格为P2,时间区间T2；那么当前价格
          P3=D1*0.5*T1销量/T2销量，D2不可为0，初始值1。 P3最低值为4，不设上限。</div>
      </template>
    </tab-list>
    <div class="line"></div>
    <indexGoodsItem></indexGoodsItem>
    <div class="line_s"></div>
  </div>
</template>

<script>
import Clock from './index-clock'
import Info from './index-info'
import myCharts from "com/common/echarts";
import tabList from "com/index/tab-list";
import indexGoodsItem from 'com/index/index-goods-item'


export default {
  components: {
    Clock, Info, myCharts, tabList, indexGoodsItem
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
@mixin line($h) {
  height: size($h);
  background: #f6f6f6;
  margin: size(44) 0;
}
.index {
  padding-bottom: size(100);
  .line {
    @include line(14);
  }
  .line_s {
    @include line(2);
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