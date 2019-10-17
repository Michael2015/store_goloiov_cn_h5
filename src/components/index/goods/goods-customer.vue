<template>
  <div class="wrap">
    <top-head :transparent="true">
      <div class="share" @click="createPoster" slot="right">
        <img src="~img/icon/share.png" alt="">
      </div>
    </top-head>
    <goods-banner :imgs="info.slider_image"></goods-banner>
    <div class="tips-for-free">适用免单奖励的商品不适用7天无理由退货</div>
    <div class="intro-wrap">
      <div class="price-num">
        <span class="price">原价 <span>{{info.price}} </span></span>
        <span class="price-cut" v-if="false"> 合伙人价 ¥999</span>
        <span class="num">已售：{{info.sales}}</span>
      </div>
      <div class="join-partner table">
        <div class="icon">
          <img src="~img/icon/join-partner.png" alt="">
        </div>
        <div class="text">
          <div>加入合伙人，四重优惠等你拿</div>
          <div>返利+津贴+带团队分润+部分商品合伙人价</div>
        </div>
        <div class="join-wrap" @click="join">
          <div class="join">
            立即加入 <img src="~img/icon/right.png" alt="">
          </div>
        </div>
      </div>
      <div class="goods-name">
        {{info.store_name}}
      </div>
      <div class="free-intro table" v-if="info.is_platoon === 1">
        <div class="icon-wrap">
          <img src="~img/icon/tips.png" alt="">
        </div>
        <div class="text">
          <div>下单即享免单</div>
          <div>合伙人推荐购买即享返利</div>
        </div>
        <div class="go-free-intro" @click="$refs.showFreeIntro.show()">
          <span>免单奖励介绍</span>
        </div>
      </div>
    </div>
    <div class="navs border-bottom">
      <router-link tag="span" to="detail" replace>详情</router-link>
      <router-link tag="span" to="buy-records" replace>购买记录</router-link>
      <router-link tag="span" to="comment" replace>评论</router-link>
    </div>
    <div style="padding-bottom:60px;">
      <keep-alive>
        <router-view :id="id"></router-view>
      </keep-alive>
    </div>
    <div class="action-bar table border-top">
      <div class="shop border-right" @click="goIndex">
        <div class="icon"><img src="~img/icon/shop.png" alt=""></div>
        <div class="text">店铺</div>
      </div>
      <div class="contact border-right" @click="$refs.contact.show()">
        <div class="icon"><img src="~img/icon/contact.png" alt=""></div>
        <div class="text">联系</div>
      </div>
      <div class="buy" @click="buy">
        <span>立即购买</span>
      </div>
    </div>
    <notice ref="notice" :autoClose="true"></notice>
    <contact ref="contact" :data="partner"></contact>
    <join-partner ref="joinPartner"></join-partner>
    <free-intro ref="showFreeIntro" :info="info"></free-intro>
  </div>
</template>

<script>
import Contact from 'base/contact'
import GoodsBanner from './goods-banner'
import FreeIntro from 'base/free-intro'
import {Loading} from 'lib'
import Notice from 'base/notice'
import JoinPartner from 'com/common/join-partner'
import {CustomerGetGoodsInfo, getPartnerInfo, getQrcode} from 'api'
import {login} from 'api/login'
import {mapState} from 'vuex'
import Poster from 'lib/poster'
import {sharePoster} from 'api/native'

// 海报上的图片
const tips = require('img/blessing.png')

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    Contact,
    Notice,
    JoinPartner,
    GoodsBanner,
    FreeIntro
  },
  data() {
    return {
      // 商品的基本信息，价格，图片啊
      info: {},
      // 店铺信息
      partner: {}
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo']),
  },
  created() {
    Loading.open()
    Promise.all([
      CustomerGetGoodsInfo(this.id).then(data => {
        if (data) {
          this.info = data
        }
      })
    ]).then(() => {
      Loading.close()
    })
    this.getPartner()
  },
  watch: {
    isLogin() {
      this.getPartner()
    }
  },
  methods: {
    getPartner() {
      let sharedId = 0
      if (this.isLogin && this.userInfo.partner_id) {
        sharedId = this.userInfo.partner_id
      }
      getPartnerInfo(sharedId).then(data => {
        if (data) {
          this.partner = data
        }
      })
    },
    join() {
      // 加入合伙人
      if (!this.isLogin) {
        // 没有登录
        this.triggerLogin()
      } else {
        this.$refs.joinPartner.show(this.partner)
      }
    },
    goIndex() {
      this.$router.push('/index')
    },
    createPoster() {
      if (!this.isLogin) {
        this.triggerLogin()
        return
      }
      if (this.poster) {
        sharePoster(this.poster.base64)
        return
      }
      Loading.open()
      this.poster = new Poster(this.info.store_name)
      Promise.all([
        this.poster.drawGoods(this.info.slider_image[0]),
        this.poster.drawTips(tips),
        getQrcode([this.userInfo.uid,  this.userInfo.partner_id, this.id].join(',')).then(data => {
          if (data) {
            return this.poster.drawQrcode(data)
          } else {
            return Promise.reject('获取二维码失败')
          }
        })
      ]).then(() => {
        console.log(this.poster.getBase64())
        this.poster.base64 = this.poster.getBase64().replace('data:image/png;base64,', '')
        sharePoster(this.poster.base64)
      },() => {
        this.poster = null
      }).finally(() => {
        Loading.close()
      })
    },
    triggerLogin() {
      this.$refs.notice.show('请先登录', () => {
        login().then(() => {
          // 登录成功了
        }, () => {
          this.$refs.notice.show('登录失败，请稍后再试')
        }).finally(() => {
          // 最后
        })
      })
    },
    buy() {
      // 购买商品
      if (!this.isLogin) {
        // 没有登录
        this.triggerLogin()
        return
      }
      // 跳入购买页面 传入商品id
      this.$router.push({
        name: 'buy-goods',
        params: {
          id: this.id,
          info: this.info
        }
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
}
.share{
  text-align: right;
  img{
    width: size(34);
    display: inline-block;
  }
  padding: size(6) 0;
  padding-right: size(12);
  padding-left: size(12);
}
.tips-for-free{
  line-height: size(54);
  padding: 0 size(30);
  background: #fff0f0;
  color: #333;
  font-size: size(24);
}
.intro-wrap{
  padding: 0 size(30) size(40);
  background: #fff;
  .price-num{
    line-height: size(66);
    .price{
      color:#fe0000;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      font-size: size(36);
      >span{
        font-size: size(48);
      }
    }
  }
  .price-cut{
    font-size: size(26);
  }
  .num{
    float: right;
    font-size: size(24);
    color: #555;
    position: relative;
    top: size(12);
  }
  .join-partner{
    background-color: #453d3d;
    border-radius: 5px;
    height: size(78);
    padding: 0 size(14);
    color: #d6c7ae;
    >div{
      display: table-cell;
      vertical-align: middle;
    }
    .icon{
      width: size(24);
      vertical-align: top;
      img{
        width: 100%;
        display: block;
        margin-top: size(18);
      }
    }
    .text{
      padding-left: size(8);
      div{
        &:first-child{
          font-size: size(26);
        }
        &:last-child{
          font-size: size(20);
          margin-top: size(8);
        }
      }
    }
    .join-wrap{
      text-align: right;
    }
    .join{
      font-size: size(24);
      img{
        width: size(10);
        margin-left: 2px;
      }
    }
  }
  .goods-name{
    font-size: size(30);
    color: #303030;
    line-height: size(52);
    @include txt-overflow(2);
    font-weight: 800;
    margin: size(20) 0;
  }
  .free-intro{
    height: size(78);
    background-color: #f7f7f7;
    border: solid 1px #f0f0f0;
    padding: 0 size(16);
    font-size: size(24);
    color: #7c7b7b;
    line-height: 1.4;
    >div{
      display: table-cell;
      vertical-align: middle;
    }
    .go-free-intro{
      color: #ff0000;
      text-align: right;
      padding-right: size(12);
    }
    .text{
      padding-left: size(18);
    }
    .icon-wrap{
      width: size(48);
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
.navs{
  text-align: center;
  font-size: 0;
  background: #fff;
  margin-top: size(20);
  >span{
    display: inline-block;
    font-size: size(30);
    color: #666;
    padding: size(0) size(30);
    line-height: size(96);
    position: relative;
    &.router-link-active{
      color:#333;
      font-weight: 800;
      font-size: size(38);
    }
  }
}
.action-bar{
  position: fixed;
  z-index: 9;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  height: size(100);
  >div{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .shop,.contact{
    width: size(126);
    font-size: 0;
    .text{
      font-size: size(18);
      color: #666;
      line-height: size(25);
      margin-top: 2px;
    }
  }
  .shop{
    img{
      width: size(44);
    }
  }
  .contact{
    img{
      height: size(44);
    }
  }
  .buy{
    background-image: linear-gradient(135deg, #ff0000 0%, #ff3061 100%);
    font-size: size(30);
    color: #fff;
  }
}
</style>