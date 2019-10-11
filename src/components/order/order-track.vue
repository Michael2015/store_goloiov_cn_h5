<template>
  <!-- 订单的物流信息 -->
  <div class="wrap">
    <div class="head">
      <span>{{name}}：</span>
      <span>{{id}}</span>
    </div>
    <div class="list">
      <template v-if="list.length > 0 ">
        <div class="line"></div>
        <div class="item clearfix" v-for="(item,index) in list" :key="index">
          <div class="dot"></div>
          <div class="info">
            <p class="w">{{item.AcceptStation}}</p>
            <p class="time">{{item.AcceptTime}}</p>
          </div>
        </div>
      </template>
      <div class="no-info" v-else>暂无物流信息</div>
    </div>
  </div>
</template>

<script>
import {getOrderTrack} from 'api/order'
import {Loading} from 'lib'
export default {
  data() {
    return {
      id: '', //物流id
      name: '', //哪一家物流
      list: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    Loading.open()
    getOrderTrack(this.id, this.name).then(data => {
      if (data) {
        this.list = data.Traces
      }
      Loading.close()
    }) 
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
}
.head{
  background: #fff;
  line-height: size(132);
  padding: 0 size(20);
  text-align: center;
  font-size: size(28);
}
.list{
  margin-top: size(20);
  background: #fff;
  padding: size(32) size(24);
  min-height: size(300);
  position: relative;
  .line{
    position: absolute;
    top: size(32);
    bottom: size(32);
    width: size(4);
    background: #e3e5e9;
    left:size(24 + 20);
  }
  .item{
    margin-bottom: size(50);
    .dot{
      float: left;
      position: relative;
      z-index: 1;
      @include circle(44);
      // background-image: linear-gradient(180deg, #f51407 0%, #fb3b11 100%);
      @include bg('~img/icon/deliver.png');
    }
    .info{
      padding-left: size(80);
      font-size: size(30);
      line-height: 1.4;
      .w{
        word-break: break-all;
        word-wrap: break-word;
      }
      .time{
        font-size: size(28);
        color: #666;
        margin-top: size(20);
      }
    }
  }
}
.no-info{
  font-size: size(30);
  color: #999;
  text-align: center;
  padding: size(80) size(20);
}
</style>