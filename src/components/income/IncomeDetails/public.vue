<template>
  <div class="warp">
    <div class="award">免单奖励100000000元</div>
    <div class="user_msg">
      <img src="~img/location-red.png" alt />
      <div class="msg">
        <div class="address">广东省 深圳市 龙岗区 坂田五和大道远征工业园 远征研发大厦</div>
        <div class="name_phone">
          <div class="name">少年闰土</div>
          <div class="phone">182****0000</div>
        </div>
      </div>
    </div>
    <div class="simpleness_show">
      <div class="left">订单号: 1357263</div>
      <div class="right">待发货</div>
    </div>
    <div class="simpleness_show">
      <div class="left">结算状态: 2019年05月21日 03:32:46</div>
      <div class="right">待结算</div>
    </div>
    <div class="simpleness_show">
      <div class="left">免单方式: 排队免单</div>
      <div class="right"></div>
    </div>
    <div class="about_order">
      <div class="title">关联订单:</div>
      <div class="order_list">
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名666666666</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
        <div class="item">
          <img src="~img/contactIcon.png" alt />
          <div class="order_msg">
            <div class="about_name">用户名</div>
            <div class="order_no">1256624</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good_show">
      <img src="~img/contactIcon.png" alt />
      <div class="good_msg">
        <div class="main_show">
          <div class="desc">
            <div class="good_name">元征goloX3 智能车联网车载智慧终端汽车诊断仪车载wifi智能盒子行车电脑</div>
            <div class="color">黑色</div>
          </div>
          <div class="about_money">
            <div class="money">¥1199.00</div>
            <div class="count">×1</div>
          </div>
        </div>
        <div class="allmoney">
          <span>已优惠金额：￥799.00</span>
          <span></span>
          <span>
            合计：
            <span>￥100.00</span>
          </span>
        </div>
      </div>
    </div>
    <div class="exey_show_list">
      <div class="exey_show">
        <div class="left">订单来源</div>
        <div class="right">少年闰土</div>
      </div>
      <div class="exey_show">
        <div class="left">购买人</div>
        <div class="right">少年闰土</div>
      </div>
      <div class="exey_show">
        <div class="left">下单时间</div>
        <div class="right">2018年10月21日 12:07:59</div>
      </div>
      <div class="exey_show">
        <div class="left">物流信息</div>
        <div class="right">3726374892733</div>
      </div>
      <div class="exey_show">
        <div class="left">赠送产品</div>
        <div class="right">XXXXXXXXXXX</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  font-size: size(24);
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .award {
    color: #fff;
    font-size: size(34);
    height: size(163);
    line-height: size(163);
    background: linear-gradient(90deg, #f45445 0%, #e62a21 100%);
    padding: 0 size(40);
    font-family: PingFangSC-Medium;
  }
  .user_msg {
    display: flex;
    padding: size(26) size(30) size(30) size(30);
    background: #ffffff;
    & > img {
      width: size(46);
      height: size(46);
      margin-right: size(16);
    }
    .msg {
      flex: 1;
      .address {
        color: #333333;
        font-size: size(26);
        height: size(37);
        line-height: size(37);
        margin-top: size(4);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
      }
      .name_phone {
        margin-top: size(20);
        display: flex;
        color: #666666;
        font-size: size(24);
        .name {
          margin-right: size(35);
        }
        .phone {
          flex: 1;
          color: #999999;
        }
      }
    }
  }
  .simpleness_show {
    margin-top: size(2);
    font-size: size(28);
    color: #9e9e9e;
    height: size(100);
    line-height: size(100);
    padding: 0 size(30);
    display: flex;
    background: #fff;
    &:nth-child(1) {
      margin-top: size(20);
    }
    .right {
      color: #333333;
      flex: 1;
      text-align: right;
    }
  }
  .about_order {
    margin-top: size(2);
    background: #ffffff;
    padding: size(22) size(30);
    .title {
      color: #333;
      font-size: size(28);
    }
    .order_list {
      display: flex;
      flex-wrap: wrap;
      .item {
        min-width: 33.33%;
        display: flex;
        margin-top: size(22);
        & > img {
          width: size(68);
          height: size(68);
          border-radius: 50%;
          margin-right: size(12);
        }
        .order_msg {
          flex: 1;
          .about_name {
            color: #333;
            font-size: size(26);
            width: size(144);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .order_no {
            font-size: size(22);
            color: #999;
            width: size(144);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .good_show {
    margin-top: size(20);
    background: #ffffff;
    padding: size(25) size(20) size(20) size(20);
    display: flex;
    & > img {
      width: size(138);
      height: size(138);
      margin-right: size(11);
    }
    .good_msg {
      flex: 1;
      .main_show {
        display: flex;
        border-bottom: size(1) solid #f2f2f2;
        padding-bottom: size(28);
        .desc {
          width: size(432);
          font-size: size(26);
          color: #333333;
          .color {
            color: #999999;
            font-size: size(24);
            margin-top: size(16);
          }
        }
        .about_money {
          flex: 1;
          font-size: size(24);
          text-align: right;
          .money {
            color: #000;
          }
          .count {
            color: #666666;
          }
        }
      }
      .allmoney {
        text-align: right;
        height: size(66);
        line-height: size(66);
        & > span {
          &:nth-child(1) {
            color: #333333;
            font-size: size(22);
            margin-right: size(20);
          }
          &:nth-child(2) {
            display: inline-block;
            width: size(2);
            height: size(23);
            background: #cfcfcf;
            color: #cfcfcf;
          }
          &:nth-child(3) {
            font-size: size(24);
            color: #333333;
            margin-left: size(20);
            & > span {
              font-size: size(24);
              color: #e31436;
            }
          }
        }
      }
    }
  }
  .exey_show_list {
    padding: size(40) size(30);
    background: #fff;
    margin-top: size(20);
    .exey_show {
      margin-top: size(30);
      height: size(40);
      line-height: size(40);
      display: flex;
      justify-content: space-between;
      font-size: size(28);
      &:nth-child(1) {
        margin-top: 0;
      }
      .left {
        color: #9e9e9e;
      }
      .right {
        color: #333;
      }
    }
  }
}
</style>