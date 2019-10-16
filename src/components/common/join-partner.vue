<template>
  <div>
    <confirm ref="confirm">
      <template v-if="who">
        确定加入 {{who}} 的团队吗？
      </template>
      <template v-else>
        确定成为顶级合伙人吗？
      </template>
    </confirm>
  </div>
</template>

<script>
import Confirm from 'base/confirm'
import {joinPartner} from 'api'
import {updateUserInfo} from 'api/me'
import {Toast} from 'lib'
export default {
  components: {
    Confirm
  },
  data () {
    return {
      who: ''
    }
  },
  methods: {
    show(info) {
      if (info && info.uid !== 0) {
        // 16个字符
        this.who = info.nickname.substr(0, 16)
      }
      this.$refs.confirm.show('', () => {
        joinPartner(info.uid).then(data => {
          if (data) {
            Toast('加入成功')
            updateUserInfo()
          } else {
            Toast('加入失败')
          }
        }, () => Toast('加入失败'))
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~css/def";
</style>