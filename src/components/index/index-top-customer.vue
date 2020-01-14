<template>
  <div class="table">
    <div class="table-cell">
      <div class="clearfix">
        <img v-if="partner.phone" :src="partner.avatar" alt="" class="parent-avatar" @click="showPartner" style="background:#fff;">
        <!-- <img v-else src="~img/shop-logo.png" alt="" class="parent-avatar"> -->
        <span class="shop-name">{{info.site_name||'万车品商城'}}</span>
      </div>
    </div>
    <div class="table-cell invite-wrap">
      <span class="invite" v-if="isLogin" @click="join">成为合伙人</span>
      <span class="invite" v-else @click="doLogin">登录/注册</span>
    </div>
    <contact ref="contact" :data="partner"></contact>
    <notice ref="notice" :autoClose="true"></notice>
  </div>
</template>

<script>
import Contact from 'base/contact'
import Notice from 'base/notice'
import {mapState} from 'vuex'
import {getIndexTopInfo, getPartnerInfo} from 'api'
import {login} from 'api/login'
export default {
  components: {
    Contact,
    Notice
  },
  data() {
    return {
      info: {},
      partner: {}
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo']),
  },
  created() {
    getIndexTopInfo().then(data => {
      if (data) {
        this.info = data
      }
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
    showPartner() {
      this.$refs.contact.show()
    },
    join() {
      this.$router.push('/join-partner')
    },
    doLogin() {
      // this.$store.commit('loginTest')
      login().then(() => {
        // 登录成功了
      }, () => {
        this.$refs.notice.show('登录失败，请稍后再试')
      }).finally(() => {
        // 最后
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.invite-wrap{
  text-align: right;
  width: size(180);
}
.invite{
  color: #fff;
  font-size: size(26);
  line-height: size(60);
  height: size(60);
  min-width: size(154);
  padding: 0 size(12);
  // margin-left: size(20);
  display: inline-block;
  background-image: linear-gradient(to right, red , #daa849);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  text-align: center;
}
.parent-avatar{
  width: size(72);
  height: size(72);
  border-radius: 5px;
  float: left;
  background: transparent;
}
.shop-name{
  vertical-align: middle;
  float: left;
  line-height: size(72);
  font-size: size(38);
  color: #fff;
  margin-left: size(22);
}
</style>