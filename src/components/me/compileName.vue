<template>
  <div class="name_warp">
    <top-head>个人信息</top-head>
    <div class="main">
      <input type="text" v-model="name" placeholder="输入用户名字" />
      <div class="clone" @click="clear"></div>
    </div>
    <div :class="updateflag?'save-btn':'save-btn cannot'" @click="save">保存</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { edituserinfo } from "api/me";
import { Toast } from "lib";
import tojump from "mixins/tojump";
export default {
  data() {
    return {
      VerificationName: "",
      name: ""
    };
  },
  mixins: [tojump],
  created() {
    this.VerificationName = this.userInfo.nickname;
    this.name = this.userInfo.nickname;
  },
  methods: {
    clear() {
      this.name = "";
    },
    save() {
      if (!this.updateflag) {
        return;
      }
      edituserinfo({nickName:this.name}).then(res => {
        if (res.code === 200) {
          Toast(res.msg);
          this.tojump("/me");
        } else {
          Toast(res.msg);
        }
      });
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    updateflag() {
      return (
        this.VerificationName !== this.name && this.name.trim().length !== 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.name_warp {
  min-height: 100vh;
  background-color: $color-body-bg;
  .main {
    background: #fff;
    position: relative;
    padding: size(36) 0;
    padding-left: size(30);
    padding-right: size(80);
    & > input {
      font-size: size(30);
      line-height: size(50);
      height: size(50);
      &::-webkit-input-placeholder {
        color: #999;
      }
    }
    .clone {
      position: absolute;
      width: size(36);
      height: size(36);
      right: size(30);
      top: 50%;
      margin-top: size(-18);
      @include bg('~img/icon/clear.png');
    }
  }
  .save-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    font-size: size(30);
    color: #fff;
    text-align: center;
    background-color: #e31336;
  }
  .cannot {
    background: #dddddd;
  }
}
</style>