<template>
  <div class="item">
    <div class="head table border-bottom">
      <div class="avatar-wrap"><div class="avatar"><img src="" alt=""></div></div>
      <div class="nickname"><div>老司机开车</div></div>
      <div class="time"><div class="free-info" v-if="false">已加入公排，目前排名：545</div><div>2019/3/8  17:08:20</div></div>
    </div>
    <div class="con table">
      <div class="goods-pic"><div><img src="" alt=""></div></div>
      <div class="goods-desc">
        <div class="name">3M 燃油宝汽油添加剂加</div>
        <div class="spec">3只装 500ML/瓶</div>
      </div>
      <div class="num">
        <span>x1</span>
      </div>
    </div>
    <div class="sum">
      合计：<span>￥1200</span> 元
      <div class="btn-inline" v-if="false">查看物流</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.item{
  min-height: 150px;
  border-radius: 6px;
  background: #fff;
  padding: 0 size(24);
}
.head{
  height: size(88);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .avatar-wrap{
    width: size(60);
  }
  .avatar{
    @include circle(60);
    background: #ddd;
    img{
      display: block;
      @include fill;
    }
  }
  .nickname{
    color: #666;
    font-size: size(28);
    padding-left: size(32);
    width: 40%;
    >div{
      @include txt-overflow;
    }
  }
  .time{
    font-size: size(24);
    color: #999;
    text-align: right;
    .free-info{
      color:$color-main;
      padding-bottom: size(8);
    }
  }
}
.con{
  padding: size(26) 0;
  >div{
    vertical-align: top;
    display: table-cell;
  }
  .goods-pic{
    width: size(120);
    >div{
      width: size(120);
      height: size(120);
      overflow: hidden;
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .goods-desc{
    padding-left: size(26);
    .name{
      font-size: size(28);
      font-weight: 800;
      margin-bottom: size(20);
      @include txt-overflow;
    }
    .spec{
      font-size: size(24);
      color: #999;
      line-height: 1.4;
      @include txt-overflow(2);
    }
  }
  .num{
    width: size(80);
    text-align: right;
    color: $color-main;
  }
}
.sum{
  font-size: size(28);
  color: #666;
  padding:size(20) 0 size(40);
  span{
    color: $color-main;
  }
  position: relative;
  .btn-inline{
    position: absolute;
    min-width: size(180);
    right:0;
    top: size(0);
  }
}
</style>