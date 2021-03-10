<template>
  <div class="modifyName">
    <top-head>修改昵称</top-head>
    <div class="username border-bot">
      <p>用户名：</p>
      <input type="text" placeholder="请输入用户名" />
    </div>
    <div class="tip">以英文字母或汉字开头，限4-16个字符，一个汉字为2个字符</div>
    <mt-button type="danger" style="width:100%;background:#D7001A"
      >确认</mt-button
    >
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      username: ""
    };
  },
  methods: {},
  mounted() {}
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
}
</style>
