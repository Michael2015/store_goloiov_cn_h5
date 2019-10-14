<template>
  <div class="name_warp">
    <input type="text" v-model="name" placeholder="输入用户名字" />
    <div class="clone" @click="clear">x</div>
    <div class="save-btn">保存</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: ""
    };
  },
  created() {
    this.name = this.userInfo.nickname;
  },
  methods: {
    clear() {
      this.name = "";
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.name_warp {
  display: flex;
  height: size(122);
  line-height: size(122);
  & > input {
    padding-left: size(30);
    font-size: size(30);
    &::-webkit-input-placeholder {
      color: #999;
    }
  }
  .clone {
    width: size(36);
    height: size(36);
    background-color: #cccccc;
    line-height: size(36);
    text-align: center;
    color: #fff;
    border-radius: 50%;
    margin-right: size(30);
    margin-top: size(42);
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
}
</style>