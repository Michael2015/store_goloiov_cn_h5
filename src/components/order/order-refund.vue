<template>
  <div class="wrap">
    <div class="goods table">
      <div class="goods-pic"><div><img src="" alt=""></div></div>
      <div class="goods-desc">
        <div class="name">3M 燃油宝汽油添加剂加燃油宝汽油添加剂加燃油宝汽油添加剂加燃油宝汽油添加剂加</div>
        <div class="spec">3只装 500ML/瓶 <span class="num">x1</span></div>
      </div>
    </div>
    <div class="reasons">
      <div class="col main border-bottom">
        <div class="left">退款原因</div>
        <div class="icon"><img src="~img/icon/join-right.png" alt=""></div>
        <div class="right">xx</div>
      </div>
      <div class="col all-price border-bottom">
        <div class="left">退款金额</div>
        <div class="right">不超过 <span> ¥1199.00</span></div>
      </div>
      <div class="col">
        <div class="left">退款详情</div>
      </div>
      <div class="more">
        <img src="~img/icon/typo.png" alt="">
        <textarea type="text" placeholder="分享你的使用体验吧～"></textarea>
      </div>
    </div>
    <div class="extra-img">
      <div class="title">上传凭证</div>
      <select-img></select-img>
    </div>
  </div>
</template>

<script>
import SelectImg from 'com/common/select-img'
export default {
  components: {
    SelectImg
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
}
.goods{
  background: #fff;
  min-height: size(190);
  padding: 0 size(30);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .goods-pic{
    width: size(120);
    >div{
      width: size(120);
      height: size(120);
      overflow: hidden;
      background: #ddd;
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .goods-desc{
    padding-left: size(20);
    .name{
      font-size: size(26);
      font-weight: 800;
      margin-bottom: size(16);
      line-height: size(40);
      min-height: size(80);
      @include txt-overflow(2);
    }
    .spec{
      font-size: size(24);
      color: #999;
      @include txt-overflow;
      .num{
        float: right;
        color: #666;
      }
    }
  }
}
.reasons{
  margin-top: size(20);
  background: #fff;
  padding-left: size(20);
  .col{
    padding-right: size(20);
    min-height: size(86);
    line-height: size(86);
    font-size: size(28);
    color: #000;
    .left{
      float: left;
    }
    .right,.icon{
      float: right;
    }
    .icon{
      img{
        display: inline-block;
        width: size(20);
        margin-left: size(20);
      }
    }
  }
  .all-price{
    .right{
      color: #666;
    }
    span{
      color: #fe0000;
    }
  }
  .more{
    padding-left: size(32);
    padding-right: size(20);
    padding-bottom: size(20);
    position: relative;
    background: #fff;
    img{
      position: absolute;
      left: size(0);
      top: size(12);
      width: size(32);
    }
    textarea{
      // background: gold;
      height: size(190);
      padding: 4px;
      padding-left: 8px;
      font-size: size(28);
      line-height: 1.4;
      &::-webkit-input-placeholder{
        font-size: size(24);
        color: #d9dad9;
      }
    }
  }
}
.extra-img{
  margin-top: size(20);
  background: #fff;
  padding: 0 size(22);
  .title{
    font-size: size(28);
    line-height: size(86);
  }
}
</style>