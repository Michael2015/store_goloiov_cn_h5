<template>
  <div class="table">
    <div class="table-cell">
      <div class="clearfix">
        <img v-if="partner.avatar" :src="partner.avatar" alt="" class="parent-avatar" @click="showPartner">
        <img v-else src="~img/shop-logo.png" alt="" class="parent-avatar">
        <span class="shop-name">{{info.site_name||'万车品商城'}}</span>
      </div>
    </div>
    <div class="table-cell invite-wrap">
      <span class="invite" v-if="isLogin">成为合伙人</span>
      <span class="invite" v-else @click="doLogin">登录/注册</span>
    </div>
    <contact ref="contact" :data="partner"></contact>
  </div>
</template>

<script>
import Contact from 'base/contact'
import {mapState} from 'vuex'
import {getIndexTopInfo, getPartnerInfo} from 'api'
export default {
  components: {
    Contact
  },
  data() {
    return {
      info: {},
      partner: {}
    }
  },
  computed: {
    ...mapState(['isLogin']),
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
      const sharedId = this.isLogin ? 2 : 0
      getPartnerInfo(sharedId).then(data => {
        if (data) {
          this.partner = data
        }
      })
    },
    showPartner() {
      this.$refs.contact.show()
    },
    doLogin() {
      this.$store.commit('loginTest')
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
  background-color: #fe2b36;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  text-align: center;
}
.parent-avatar{
  width: size(72);
  height: size(72);
  border-radius: 5px;
  float: left;
  background: #fff;
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