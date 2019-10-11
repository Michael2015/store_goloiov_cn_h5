<template>
  <div class="wrap">
    <div class="goods table">
      <div class="goods-pic"><div><img :src="orderInfo.image" alt=""></div></div>
      <div class="goods-desc">
        <div class="name">{{orderInfo.store_name}}</div>
      </div>
    </div>
    <div class="reasons">
      <div class="more">
        <img src="~img/icon/typo.png" alt="">
        <textarea type="text" placeholder="分享你的使用体验吧～" v-model="text"></textarea>
      </div>
      <div class="imgs">
        <select-img v-model="imgs"></select-img>
      </div>
    </div>
    <div class="stars">
      <div class="col">
        <div class="left">商品描述</div>
        <div class="right">
          <span class="item" v-for="item in 5" :key="item" :class="{active: item <= goodsScore}" @click="goodsScore=item"></span>
        </div>
      </div>
      <div class="col">
        <div class="left">商家服务</div>
        <div class="right">
          <span class="item" v-for="item in 5" :key="item" :class="{active: item <= shopScore}" @click="shopScore=item"></span>
        </div>
      </div>
      <div class="col">
        <div class="left">物流服务</div>
        <div class="right">
          <span class="item" v-for="item in 5" :key="item" :class="{active: item <= deliverScore}" @click="deliverScore=item"></span>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
import SelectImg from 'com/common/select-img'
import {getOrderDetail, postOrderRemark} from 'api/order'
import {Loading, Toast} from 'lib'
export default {
  components: {
    SelectImg
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      orderInfo: {}, // 订单信息
      text: '',
      imgs: [], // 上传的文件
      goodsScore: 5, // 商品描述
      shopScore: 5, // 商家服务
      deliverScore: 5 // 物流服务
    }
  },
  created() {
    Loading.open()
    getOrderDetail(this.id).then(data => {
      if (data) {
        this.orderInfo = data
      }
      Loading.close()
    })
  },
  methods: {
    submit() {
      if (!this.text) {
        Toast('请填写评论内容')
        return
      }
      const params = {
        order_id: this.id,
        product_id: this.orderInfo.product_id,
        imglist: this.imgs,
        express_star: this.deliverScore,
        desc_star: this.goodsScore,
        service_star: this.shopScore,
        comment:this.text
      }
      Loading.open()
      postOrderRemark(params).then(data => {
        if (data) {
          Toast({
            message: '评价成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        }
        Loading.close()
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
  min-height: size(234);
  padding: 0 size(30);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  .goods-pic{
    width: size(158);
    >div{
      width: size(158);
      height: size(158);
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
      font-size: size(32);
      font-weight: 800;
      line-height: size(45);
      @include txt-overflow(2);
    }
  }
}
.reasons{
  margin-top: size(20);
  background: #fff;
  padding-left: size(20);
  padding-top: size(16);
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
  .imgs{
    padding: size(20) 0;
    padding-right: size(20);
  }
}
.stars{
  padding: size(32) size(42) size(32) size(72);
  background: #fff;
  margin-top: size(20);
  margin-bottom: size(120);
  .col{
    line-height: size(38);
    height: size(38);
    margin-bottom: size(32);
    &:last-child{
      margin-bottom: 0;
    }
    .left{
      float: left;
    }
    .right{
      float: right;
      text-align: right;
    }
  }
  .item{
    display:inline-block;
    width: size(36);
    height: size(36);
    margin-left: size(28);
    @include bg('~img/icon/star-down.png');
    &.active{
      @include bg('~img/icon/star-up.png');
    }
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