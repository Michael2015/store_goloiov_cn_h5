<template>
  <div class="wrap">
    <top-head>申请退货</top-head>
    <div class="goods table">
      <div class="goods-pic"><div><img :src="orderInfo.image" alt=""></div></div>
      <div class="goods-desc">
        <div class="name">{{orderInfo.store_name}}</div>
        <div class="spec">{{orderInfo.suk}}<span class="num">x{{orderInfo.total_num}}</span></div>
      </div>
    </div>
    <div class="reasons">
      <div class="col main border-bottom" @click="selReason">
        <div class="left">退款原因</div>
        <div class="icon"><img src="~img/icon/join-right.png" alt=""></div>
        <div class="right">{{mainReason?mainReason:'请选择'}}</div>
      </div>
      <div class="col all-price border-bottom">
        <div class="left">退款金额</div>
        <div class="right">不超过 <span> ¥{{orderInfo.pay_price}}</span></div>
      </div>
      <div class="col">
        <div class="left">退款详情</div>
      </div>
      <div class="more">
        <img src="~img/icon/typo.png" alt="">
        <textarea type="text" placeholder="分享你的使用体验吧～" v-model="text"></textarea>
      </div>
    </div>
    <div class="extra-img">
      <div class="title">上传凭证</div>
      <select-img :max="3" v-model="imgs"></select-img>
    </div>
    <div class="submit" @click="submit">提交</div>
    <!-- 选择主要退货原因 -->
    <bottom-pick ref="mainReason"></bottom-pick>
    <notice ref="notice"></notice>
  </div>
</template>

<script>
import SelectImg from 'com/common/select-img'
import Notice from 'base/notice'
import BottomPick from 'base/bottom-pick'
import {getOrderDetail, orderRefund} from 'api/order'
import {Loading, Toast} from 'lib'

export default {
  components: {
    SelectImg,
    BottomPick,
    Notice
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      orderInfo: {},
      mainReason: '',
      text: '',
      imgs: []
    }
  },
  created() {
    this.loaddata()
  },
  methods: {
    loaddata() {
      Loading.open()
      getOrderDetail(this.id).then(data => {
        if (data) {
          this.orderInfo = data
        }
        Loading.close()
      })
    },
    selReason() {
      this.$refs.mainReason.show(['未收到', '损坏', '其他'], result => {
        this.mainReason = result[0]
      })
    },
    submit() {
      // 提交申请
      if (!this.mainReason) {
        Toast('请选择退款原因')
        return
      }
      const params = {
        order_id: this.id,
        refund_price: this.orderInfo.pay_price,
        refund_reason_wap: this.mainReason,
        refund_reason_wap_explain: this.text,
        refund_reason_wap_img: this.imgs
      }
      Loading.open()
      orderRefund(params).then(data => {
        Loading.close()
        if (data) {
          this.$refs.notice.show('您的申请已提交', () => {
            this.$router.back()
          })
        }
      })
    }
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
  margin-bottom: size(100);
  .title{
    font-size: size(28);
    line-height: size(86);
  }
}
.submit{
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  line-height: size(100);
  height: size(100);
  text-align: center;
  width: 100%;
  background: #e31336;
  color: #fff;
  font-size: size(30);
}
</style>