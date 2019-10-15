<template>
  <div class="input-wrap table">
    <div>
      <img src="~img/sousuo.png" alt="">
    </div>
    <div>
      <input type="search" @input="onInput" :placeholder="placeholder" v-on:keyup.enter="$emit('search')">
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
    onInput(e) {
      this.$emit('input', e.target.value)
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
  padding-left: size(20);
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
      color: #9ea2a0;
    }
  }
}
</style>