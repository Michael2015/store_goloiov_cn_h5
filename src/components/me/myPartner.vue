<template>
  <div class="my_partner_warp">
    <div class="header">
      <div class="left">
        <img
          src="https://wx.qlogo.cn/mmopen/vi_32/bYDM1OWAZ92xNWTAiadjrrIBLIwalWdvYx6t7PN36gkSMP3UDsa0LD8dibwfdEudKHQmnj41BJksnIqmYRmj5yoA/132"
          alt
        />
        我的合伙人
      </div>
      <div class="right">{{num}}人</div>
    </div>
    <div class="content">
      <div class="search">
        <img src="~img/sousuo.png" alt />
        <input type="text" placeholder="搜索" />
      </div>
      <div class="partner_list">
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
        </div>
        <div class="item">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=721b46b36e2762d0803ea3b998d76fc7/a71ea8d3fd1f41344cfdfcee281f95cad0c85e5c.jpg" alt />
          <div class="name">浙江NV</div>
          <div class="show_count">5</div>
        </div>
      </div>
    </div>
    <div class="invite_btn">邀请合伙人</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.my_partner_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .header {
    height: size(106);
    line-height: size(106);
    background: #fff;
    padding: 0 size(30);
    display: flex;
    justify-content: space-between;
    .left {
      font-size: size(30);
      color: #333333;
      & > img {
        width: size(60);
        height: size(60);
        border-radius: 50%;
        margin-right: size(18);
        vertical-align: middle;
      }
    }
    .right {
      font-size: size(26);
      color: #000;
    }
  }
  .content {
    margin-top: size(2);
    background: #fff;
    padding: size(32) size(30) size(100) size(30);
    .search {
      height: size(64);
      background-color: #f5f5f5;
      border-radius: size(32);
      display: flex;
      & > img {
        width: size(32);
        height: size(32);
        margin-left: size(20);
        margin-top: size(17);
        margin-right: size(14);
      }
      & > input {
        font-size: size(28);
        &::-webkit-input-placeholder {
          color: #9ea2a0;
        }
      }
    }
    .partner_list {
      padding: size(49) size(15) 0 size(15);
      display: flex;
      flex-wrap: wrap;
      .item {
        width: size(100);
        height: size(141);
        margin-right: size(40);
        margin-top: size(25);
        position: relative;
        &:nth-child(5n){
            margin-right: 0;
        }
        &>img{
            width: 100%;
            height: size(100);
            border-radius: size(8);
        }
        .name{
            font-size: size(24);
            color: #4e4e4e;
            width: size(96);
            margin-left: size(2);
            text-align: center;
            margin-top: size(8);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .show_count{
            position: absolute;
            right: size(-17);
            top:size(-13);
            box-sizing: border-box;
            width: size(48);
            height: size(48);
            line-height: size(48);
            border-radius: 50%;
            border: size(4) solid #fff;
            background: #fc4747;
            color: #fff;
            font-size: size(26);
            text-align: center;
        }
      }
    }
  }
  .invite_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    background: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
    font-size: sizes(30);
    letter-spacing: size(1);
    color: #ffffff;
    text-align: center;
  }
}
</style>