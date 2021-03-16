<template>
  <div class="modifyName">
    <top-head>修改昵称</top-head>
    <div class="username border-bot">
      <p>用户名：</p>
      <input type="text"
             placeholder="请输入用户名"
             v-model="username" />
    </div>
    <div class="tip">以英文字母或汉字开头，限4-16个字符，一个汉字为2个字符</div>
    <div class="sure"
         @click="sure">确认</div>
  </div>
</template>

<script>
import { Toast } from "lib";
let reg = /^([a-zA-Z]|[\u4e00-\u9fa5])/;
export default {
  components: {},
  data() {
    return {
      username: ""
    };
  },
  mounted() {
    this.$store.commit('setRouterFlag', false)
  },
  methods: {
    sure() {
      let front = reg.test(this.username);
      if (!this.username) {
        Toast("请输入用户名");
      } else if (front) {
        let len = this.username.replace(/[\u4e00-\u9fa5]/g, "**").length;
        if (len >= 4 && len <= 16) {
          let obj = JSON.parse(JSON.stringify(this.$store.state.currentData))
          obj.nickname = this.username
          this.$store.commit('setCurrentData', obj)
          this.$router.back()
        } else {
          Toast("长度必须在4-16个字符内");
        }
      } else {
        Toast("必须以英文字母或汉字开头");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.modifyName {
  font-size: size(32);
  padding: 0 size(26);
  .username {
    line-height: size(40);

    > p {
      margin: size(20) 0;
      border: 0;
    }
    > input {
      padding: 0;
      margin-bottom: size(10);
    }
  }
  .tip {
    line-height: size(50);
    margin: size(10) 0 size(30) 0;
  }
  .sure {
    line-height: size(80);
    height: size(80);
    text-align: center;
    width: 100%;
    background: #e31336;
    color: #fff;
    font-size: size(30);
    margin-top: size(60);
    border-radius: size(8);
  }
}
</style>
