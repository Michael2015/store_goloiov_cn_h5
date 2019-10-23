<template>
  <div class="wrap">
    <top-head>加入合伙人</top-head>
    <div class="join-form table">
      <div>
        <input type="number" placeholder="请输入推荐人的手机号，选填" pattern="[0-9]*" v-model="phone">
      </div>
    </div>
    <div class="join" @click="join">加入合伙人</div>
    <notice ref="notice"></notice>
  </div>
</template>

<script>
import {joinPartner} from 'api'
import {updateUserInfo} from 'api/me'
import {Toast} from 'lib'
import notice from 'base/notice'
export default {
  components: {
    notice
  },
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    join() {
      if (this.phone && !/^1[\d]{10}$/.test(this.phone)) {
        Toast('请输入正确的手机号码')
        return
      }
      joinPartner(this.phone || '000000').then(data => {
        if (data) {
          this.$refs.notice.show('加入成功', () => {
            this.$router.back()
          })
          updateUserInfo()
        } else {
          Toast('加入失败')
        }
      }, (msg) => Toast(msg || '加入失败'))
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
.join-form{
  background: #fff;
  padding: 0 size(30);
  height: size(100);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  input{
    line-height: size(70);
    height: size(70);
    font-size: size(28);
    &::-webkit-input-placeholder {
      color: #aaaaaa;
      font-size: size(28);
    }
  }
}
.join{
  width: size(690);
  height: size(90);
  line-height: size(90);
  border-radius: size(46);
  font-size: size(32);
  text-align: center;
  background-image: linear-gradient(90deg, #ff2d23 0%, #ff4169 100%);
  color: #ffffff;
  margin: auto;
  margin-top: size(66);
}
</style>