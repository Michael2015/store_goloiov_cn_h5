<template>
  <div class="me_warp">
    <div class="header">
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
export default {
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
      width: 496px;
      height: 496px;
      border-radius: 50%;
      background: #ec3537;
      z-index: 1;
      right: -350px;
      top: 0;
    }
    .content{
      position: relative;
      z-index: 2;
      padding: 24px 24px 48px;
      display: flex;
      align-items: center;
      .avatar{
        width: 88px;
        height: 88px;
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
        padding-left: 24px;
        flex: 1;
        .name{
          font-size: 32px;
          &>span{
            font-size: 24px;
            background: rgba(255, 255, 255, 0.2953);
            border-radius: 8px;
            padding: 5px 20px;
            color: #fff;
          }
        }
        .num{
          font-size: 24px;
          margin-top: 15px;
        }
      }
      .right{
        width: 18px;
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
    padding: 0 24px;
    background: #fff;
    min-height: 120px;
    margin-bottom: 24px;
    position: relative;
    &::after{
      content: ' ';
      display: block;
      width: 1px;
      height: 60%;
      left: 50%;
      top: 20%;
      background: #e4e4e4;
      position: absolute;
    }
    .tab{
      flex: 1;
      text-align: center;
      font-size: 28px;
      color: #666;
      &>img{
        width: 48px;
        vertical-align: middle;
        margin-right: 24px;
        height: auto;
      }
      // &>span{}
    }
  }
  .group{
    background: #fff;
    padding-left: 24px;
    margin-bottom: 24px;
    .nav{
      display: flex;
      align-items: center;
      padding-right: 24px;
      min-height: 90px;
      position: relative;
      .icon{
        width: 40px;
        &>img{
          width: 100%;
          height: auto;
        }
      }
      .name{
        font-size: 28px;
        margin-left: 24px;
        color: #666;
      }
      .right_text{
        flex: 1;
        text-align: right;
        padding-right: 16px;
        font-size: 24px;
        color: #333;
      }
      .right_icon{
        width: 16px;
        &>img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>