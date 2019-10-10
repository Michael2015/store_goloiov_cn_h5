<template>
  <div v-show="isShow">
    <div class="mask"></div>
    <div class="city-wrap">
      <div class="title border-bottom">所在地区<img src="~img/close.png" alt="" class="close" @click="hide"></div>
      <div class="col border-bottom result">
        <div class="one" :class="{blank: step < 1}">{{step>=1 ? selProvince.areaname : '请选择'}}</div>
        <div class="two" v-if="step>=1" :class="{blank: step < 2}">{{step>=2 ? selCity.areaname : '请选择'}}</div>
        <div class="three" v-if="step>=2" :class="{blank: step < 3}">{{step>=3 ? selArea.areaname : '请选择'}}</div>
      </div>
      <div class="list">
        <!-- eslint-disable-next-line -->
        <div class="col border-bottom" v-for="item in maxLength" :i="item">
          <div class="one" v-if="province[item - 1]" @click="selP(province[item - 1])">{{province[item - 1].areaname}}</div>
          <div class="one" v-else></div>
          <div class="two" v-if="step>=1 && city[item - 1]" @click="selC(city[item - 1])">{{city[item - 1].areaname}}</div>
          <div class="tow" v-else></div>
          <div class="three" v-if="step>=2 && area[item - 1]" @click="selA(area[item - 1])">{{area[item - 1].areaname}}</div>
          <div class="three" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
import {getAreaInfo} from 'api'
export default {
  mixins: [showHide],
  data() {
    return {
      step: 0,
      province: [],
      selProvince: null,
      city: [],
      selCity: null,
      area: [],
      selArea: null
    }
  },
  computed: {
    maxLength() {
      const l = Math.max(this.province.length, this.city.length)
      return Math.max(l, this.area.length)
    }
  },
  created() {
    
  },
  methods: {
    show() {
      this.isShow = true
      this.step = 0
      if (this.province.length <= 0) {
        // 加载省的数据
        getAreaInfo().then(data => {
          if (data) {
            this.province = data
          }
        })
      }
    },
    selP(p) {
      getAreaInfo(p.id).then(data => {
        if (data) {
          this.selProvince = p
          this.city = data
          this.step = 1
        }
      })
    },
    selC(c) {
      getAreaInfo(c.id).then(data => {
        if (data) {
          this.selCity = c
          this.area = data
          this.step = 2
        }
      })
    },
    selA(a) {
      this.selArea = a
      this.step = 3
      this.$emit('input', [this.selProvince.areaname, this.selCity.areaname, this.selArea.areaname])
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.city-wrap{
  background: #fff;
  min-height: 100px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 999;
  min-height: 300px;
  .title{
    line-height: size(100);
    font-size: size(28);
    font-weight: 800;
    padding: 0 size(20);
    position: relative;
    .close{
      float: right;
      width: size(30);
      margin-top: size(32);
    }
  }
  .list{
    height: size(80 * 8);
    overflow: scroll;
  }
  .col{
    line-height: size(80);
    height: size(80);
    padding: 0 size(16);
    >div{
      float: left;
      width: 33.3%;
      height: 100%;
      text-align: center;
      padding: 0 size(10);
      @include txt-overflow;
      font-size: size(28);
    }
    &.result{
      .blank{
        color: #e31436;
        position: relative;
        &:after{
          content: ' ';
          display: block;
          position: absolute;
          width: size(80);
          height: 2px;
          bottom:0;
          left: 50%;
          transform: translateX(-50%);
          background: #e31436;
        }
      }
    }
  }
}
</style>