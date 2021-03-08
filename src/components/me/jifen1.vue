<template>
  <div class="view">

    <div class="head">
      <div class="mid">
        <div class="title">当前积分：</div>
        <label>{{useable_integral}}个</label>
        <p>在Golo App上每开车1公里获得1积分</p>
      </div>
      <div class="content">
        <div class="legend">积分收支明细</div>
        <div class="text-content"
             v-for="(item,index) in list"
             :key="index">
          <div class="left">
            <p>{{item.title}}</p>
            <p class="small">{{item.createTime}}</p>
          </div>
          <div class="right add">{{item.type == 1 ? "+":"-"}}{{item.integral}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserIntegralList } from "api/me";
export default {
  data() {
    return {
      list: [],
      useable_integral: 0,
    };
  },
  mounted() {
    getUserIntegralList().then(res => {
      this.list = res.data.data;
      this.useable_integral = res.data.useable_integral || 0;
    });
  }
};
</script>s
<style lang="scss" scoped>
@import "~css/def";
.view {
  width: 90%;
  margin: 0 auto;
}
.head {
  background: #e70002;
  width: 100%;
  height: size(300);
  text-align: center;
  position: relative;
  box-sizing: border-box;
  padding-top: size(75);
  border-radius: size(20);
}
.head .mid {
  height: size(150);
  width: 100%;
  color: #fff;
}
.head .mid label {
  display: block;
  width: 100%;
  font-size: size(50);
  font-weight: bold;
  height: size(110);
  line-height: size(110);
}
.head .mid .title {
  position: absolute;
  left: size(20);
  top: size(20);
}
.head .mid p {
  display: block;
  width: 100%;
  font-size: size(24);
  height: size(40);
  line-height: size(40);
}
.content {
  text-align: center;
  margin: 0 auto;
  margin-top: size(75);
}
.content .legend {
  height: size(100);
  font-size: size(33);
  width: 100%;
  line-height: size(100);
  display: block;
}
.content .text-content {
  height: size(120);
  border-top: size(1) solid #e6e6e6;
  margin-top: size(10);
  padding: size(30) 0;
}
.content .text-content .left {
  width: 60%;
  text-align: left;
  float: left;
}
.content .text-content .left p {
  display: block;
  width: 100%;
  height: size(40);
  line-height: size(40);
}
.content .text-content .left p.small {
  font-size: size(24);
}
.content .text-content .right {
  line-height: size(80);
  text-align: right;
  font-size: size(40);
  color: #e70002;
}
.content .text-content .right.sub {
  color: #7fff00;
}
</style>