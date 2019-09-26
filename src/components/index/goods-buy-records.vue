<template>
  <div class="list">
    <div class="item table" v-for="(item,index) in 5" :key="index">
      <div class="head-wrap">
        <div class="head">
          <img src="" alt="">
        </div>
      </div>
      <div>
        <div class="who">知名人士</div>
        <div class="what">一个好用的盒子</div>
      </div>
      <div class="nn">
        <div>
          <div class="time">8天前</div>
          <div class="num">+1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.list{
  padding: 0 size(24);
}
.item{
  background: #f9f9f9;
  height: size(108);
  border-radius: size(108/2);
  margin-bottom: size(20);
  padding-left: size(14);
  padding-right: size(48);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .head-wrap{
    width: size(98);
    .head{
      @include circle(98);
      border: 2px solid #fff;
      img{
        display: block;
        @include fill;
      }
    }
  }
  .who{
    font-size: size(30);
    padding-left: size(26);
    margin-bottom: size(18);
    @include txt-overflow;
  }
  .what{
    font-size: size(24);
    color: #999;
    padding-left: size(26);
    @include txt-overflow;
  }
  .nn{
    text-align: right;
    width: size(140);
  }
  .time{
    font-size: size(20);
    color:#999;
    margin-bottom: size(18);
  }
  .num{
    font-size: size(24);
    // color: #666;
    color: #ff0000;
  }
}
</style>