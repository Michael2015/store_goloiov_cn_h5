<template>
  <div class="wrap">
    <div class="addr-wrap" @click="goSelectAddr">
      <template v-if="addr">  
        <div class="base">
          <img src="~img/icon/location.png" alt="">
          <span>{{addr.province}} {{addr.city}} {{addr.district}}</span>
        </div>
        <div class="detail">
          {{addr.detail}}
        </div>
        <div class="contact">{{addr.real_name}} {{addr.phone}}</div>
        <img src="~img/icon/join-right.png" alt="" class="right">
        <div class="line"><!-- 地址线 --></div>
      </template>
      <template v-else>
        <div class="base">
          <img src="~img/icon/location.png" alt="">
          <span>请选择收货地址</span>
        </div>
        <img src="~img/icon/join-right.png" alt="" class="right">
      </template>
    </div>
    <div class="goods table">
      <div class="img">
        <img :src="info.image?info.image:info.slider_image&&info.slider_image[0]" alt="">
      </div>
      <div class="con">
        <div class="name">{{info.store_name}}</div>
        <div class="type">{{preInfo.attr}}</div>
        <div class="price-num">
          <span class="price">￥{{preInfo.price}}</span>
          <span class="num">x1</span>
        </div>
      </div>
    </div>
    <div class="spec">
      <div class="col clearfix">
        <div class="left">商品单价</div>
        <div class="right">¥{{preInfo.price}}</div>
      </div>
      <div class="col clearfix">
        <div class="left">优惠金额</div>
        <div class="right">¥0</div>
      </div>
    </div>
    <div class="remark">
      <text-area class="input" placeholder="留言内容/备注" v-model="remark"></text-area>
    </div>
    <div class="opts table">
      <div class="price">
        <span>实付金额：¥{{preInfo.price}}</span>
      </div>
      <div class="buy">
        <span @click="doPay">立即购买</span>
      </div>
    </div>
    <pay-method ref="payMethod">{{preInfo.price}}</pay-method>
  </div>
</template>

<script>
import TextArea from 'base/ui/text-area'
import PayMethod from 'base/pay-method'
import {getPreOrderProductInfo} from 'api/buy'
import {getAddressList} from 'api/me'
import {mapState} from 'vuex'
export default {
  components: {
    TextArea,
    PayMethod
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      remark: '',
      addr: null,
      // 接口获取的信息
      preInfo: {},
      // 路由传过来的信息
      info: {}
    }
  },
  computed: {
    ...mapState(['selectAddress']),
  },
  created() {
    // this.loaddata()
  },
  activated() {
    // 这里用了上一个页面传进来的数据
    // 判断是否需要刷新页面
    if (this.$route.params.info) {
      this.remark = ''
      this.addr = null
      this.preInfo = {}
      this.info = this.$route.params.info
      this.loaddata()
    }
  },
  methods: {
    loaddata() {
      getPreOrderProductInfo(this.id).then(data => {
        if (data) {
          this.preInfo = data
        }
      })
      getAddressList().then(data => {
        if (data) {
          const defaultAddr = data.filter(i => i.is_default)
          if (defaultAddr.length > 0) {
            this.addr = defaultAddr[0]
          } else if (data.length > 0) {
            this.addr = data[0]
          } else {
            // 没有地址
          }
        }
      })
    },
    goSelectAddr() {
      // 清空上次保存的地址
      this.$store.commit('setAddress', null)
      // 选择地址，就刷新地址
      const clear = this.$watch('selectAddress', () => {
        this.addr = this.selectAddress
        clear()
      })
      this.$router.push({
        path: '/myAddress',
        query: {
          select: 1
        }
      })
    },
    doPay() {
      this.$refs.payMethod.show(type => {
        console.log(type)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
  position: relative;
}
.addr-wrap{
  background: #fff;
  padding: size(20) size(30) size(20 + 8);
  // min-height: size(208);
  .base{
    line-height: size(46);
    img{
      float: left;
      width: size(46);
      margin-right: size(12);
    }
    span{
      font-size: size(26);
    }
  }
  .detail{
    font-size: size(36);
    line-height: 1.4;
    word-break: break-all;
    word-wrap: break-word;
    margin: size(9) 0 size(16);
    padding-right: size(50);
  }
  .contact{
    font-size: size(26);
    line-height: 1.4;
  }
  position: relative;
  .right{
    position: absolute;
    right: size(30);
    top: 50%;
    width: 12px;
    margin-top: -8px;
  }
  .line{
    position: absolute;
    width: 100%;
    height: size(8);
    left:0;
    bottom: 0;
    @include bg('~img/icon/addr.png');
  }
}
.goods{
  height: size(204);
  background: #fff;
  margin-top: size(18);
  padding: 0 size(30);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .img{
    width: size(144);
    img{
      display: block;
      width: 100%;
      height: size(144);
    }
  }
  .con{
    padding-left: size(36);
    line-height: 1.4;
  }
  .name{
    font-size: size(26);
    @include txt-overflow;
  }
  .type{
    font-size: size(26);
    color: #999;
    margin-top: 4px;
  }
  .price-num{
    margin-top: size(16);
    .price{
      font-size: size(26);
    }
    .num{
      font-size: size(24);
      float: right;
      margin-right: size(60);
      margin-top: size(10);
    }
  }
}
.spec{
  margin-top: size(18);
  background: #fff;
  font-size: size(26);
  padding: size(24) size(30);
  line-height: 1.42;
  .col{
    .left{
      float: left;
    }
    .right{
      float: right;
    }
    margin-top: size(20);
    &:first-child{
      margin-top: 0;
    }
  }
}
.remark{
  background: #fff;
  margin-top: size(18);
  padding: size(30);
  >.input{
    padding: size(16) size(20);
  }
}
.opts{
  height: size(100);
  background: #fff;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  font-size: size(30);
  z-index: 1;
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .price{
    color: #e31436;
    font-weight: 800;
  }
  .buy{
    width: size(240);
    background: linear-gradient(135deg, #ff0000, #ff3061);
    color: #fff;
  }
}
</style>