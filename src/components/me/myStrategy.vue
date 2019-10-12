<template>
  <div>
    <div class="warp">
      <div class="grade">
        <div class="title">我的等级</div>
        <div class="content">{{grade}}</div>
      </div>
      <div class="grade_advantage no">
        <div class="title">我的权益</div>
        <div class="content">无</div>
      </div>
      <div class="grade">
        <div class="title">下一等级</div>
        <div class="content">VIP合伙人</div>
      </div>
      <div class="grade_advantage">
        <div class="title">等级权益</div>
        <div class="content strip">获得推广返利权益，当有人购买您分享出去的商品，您将获得商品相应的奖励</div>
      </div>
      <div class="task">
        <div class="title">待完成任务</div>
        <div class="content">购买一台golo x3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "css/def";
.warp {
  width: 100%;
  height: 100%;
  font-size: size(28);
  background: #f9f9f9;
}
.grade {
  display: flex;
  justify-content: space-between;
  padding: size(10) size(30);
  background: #ffffff;
  margin-top: size(10);
}
.grade_advantage {
  margin-top: size(10);
  padding: size(10) size(30);
}
.task {
  margin-top: size(10);
  padding: size(10) size(30);
}
.no {
  display: flex;
  justify-content: space-between;
}
.title {
  color: #999999;
}
.content {
  color: #000000;
}
.content > span {
  margin-left: size(5);
  color: red;
}
.strip {
  margin-top: size(5);
}
</style>