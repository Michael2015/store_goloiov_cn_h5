<template>
  <div class="me_warp">
    <div class="header" @click="tojump('/mymsg')">
      <div class="circle"></div>
      <div class="content">
        <div class="avatar"><img src="https://wx.qlogo.cn/mmopen/vi_32/bYDM1OWAZ92xNWTAiadjrrIBLIwalWdvYx6t7PN36gkSMP3UDsa0LD8dibwfdEudKHQmnj41BJksnIqmYRmj5yoA/132" alt=""></div>
        <div class="info">
          <div class="name">
            404
            <span>一般合伙人</span>
          </div>
          <div class="num">伙伴0人</div>
        </div>
        <div class="right"><img src="../../assets/img/icon/right-white.png" alt=""></div>
      </div>
    </div>
    <div class="tabs">
      <div class="tab">
        <img src="../../assets/img/icon/visitor.png" alt="">
        <span>访客</span>
      </div>
      <div class="tab">
        <img src="../../assets/img/icon/partner.png" alt="">
        <span>我的伙伴</span>
      </div>
    </div>
    <div class="group">
      <div class="nav"> 
        <div class="icon">
          <img src="../../assets/img/icon/my_coupon.png" alt="">
        </div>
        <div class="name">我的优惠券</div>
        <div class="right_text"></div>
        <div class="right_icon">
          <img src="../../assets/img/icon/right.png" alt="">
        </div>
      </div>
    </div>
    <div class="group">
      <div class="nav">
        <div class="icon">
          <img src="../../assets/img/icon/address.png" alt="">
        </div>
        <div class="name">收货地址</div>
        <div class="right_text"></div>
        <div class="right_icon">
          <img src="../../assets/img/icon/right.png" alt="">
        </div>
      </div>
    </div>
    <div class="group">
      <div class="nav">
        <div class="icon">
          <img src="../../assets/img/icon/home_Order.png" alt="">
        </div>
        <div class="name">我的评论</div>
        <div class="right_text"></div>
        <div class="right_icon">
          <img src="../../assets/img/icon/right.png" alt="">
        </div>
      </div>
    </div>
    <div class="group">
      <div class="nav">
        <div class="icon">
          <img src="../../assets/img/icon/edit.png" alt="">
        </div>
        <div class="name">反馈意见</div>
        <div class="right_text"></div>
        <div class="right_icon">
          <img src="../../assets/img/icon/right.png" alt="">
        </div>
      </div>
    </div>
    <div class="group">
      <div class="nav">
        <div class="icon">
          <img src="../../assets/img/icon/demo.png" alt="">
        </div>
        <div class="name">商城使用说明</div>
        <div class="right_text"></div>
        <div class="right_icon">
          <img src="../../assets/img/icon/right.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tojump from 'mixins/tojump'
export default {
  mixins:[tojump]
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.me_warp{
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .header{
    background: #e70002;
    position: relative;
    overflow: hidden;
    .circle{
      position: absolute;
      width: size(496);
      height: size(496);
      border-radius: 50%;
      background: #ec3537;
      z-index: 1;
      right: size(-350);
      top: 0;
    }
    .content{
      position: relative;
      z-index: 2;
      padding: size(24) size(24) size(48);
      display: flex;
      align-items: center;
      .avatar{
        width: size(88);
        height: size(88);
        position: relative;
        overflow: hidden;
        &>img{
          display: block;
          width: 100%;
          height: auto;
          border-radius: 50%;
        }
      }
      .info{
        color: #fff;
        padding-left: size(24);
        flex: 1;
        .name{
          font-size: size(32);
          &>span{
            font-size: size(24);
            background: rgba(255, 255, 255, 0.2953);
            border-radius: size(8);
            padding: size(5) size(20);
            color: #fff;
          }
        }
        .num{
          font-size: size(24);
          margin-top: size(15);
        }
      }
      .right{
        width: size(18);
        &>img{
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }
  .tabs{
    display: flex;
    align-items: center;
    padding: 0 size(24);
    background: #fff;
    min-height: size(120);
    margin-bottom: size(24);
    position: relative;
    &::after{
      content: ' ';
      display: block;
      width: size(1);
      height: 60%;
      left: 50%;
      top: 20%;
      background: #e4e4e4;
      position: absolute;
    }
    .tab{
      flex: 1;
      text-align: center;
      font-size: size(28);
      color: #666;
      &>img{
        width: size(48);
        vertical-align: middle;
        margin-right: size(24);
        height: auto;
      }
      // &>span{}
    }
  }
  .group{
    background: #fff;
    padding-left: size(24);
    margin-bottom: size(24);
    .nav{
      display: flex;
      align-items: center;
      padding-right: size(24);
      min-height: size(90);
      position: relative;
      .icon{
        width: size(40);
        &>img{
          width: 100%;
          height: auto;
        }
      }
      .name{
        font-size: size(28);
        margin-left: size(24);
        color: #666;
      }
      .right_text{
        flex: 1;
        text-align: right;
        padding-right: size(16);
        font-size: size(24);
        color: #333;
      }
      .right_icon{
        width: size(16);
        &>img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>