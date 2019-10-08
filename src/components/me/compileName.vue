<template>
  <div class="name_warp">
    <input type="text" placeholder="输入用户名字" />
    <div class="clone">x</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~css/def';
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
}
</style>