<template>
  <div class="input-wrap table">
    <div>
      <img src="~img/p-search.png" alt="">
    </div>
    <div>
      <input type="text" @input="onInput" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  methods: {
    onInput({target}) {
      this.$emit('input', target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.input-wrap{
  width: 100%;
  background: #fff;
  padding: 0 size(34);
  height: size(70);
  border-radius: size(35);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  img{
    width: size(24);
  }
  input{
    padding:0 4px;
    font-size: size(28);
    &::-webkit-input-placeholder{
      color: #d5d5d5;
    }
  }
}
</style>