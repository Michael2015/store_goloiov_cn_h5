<template>
  <div class="input-wrap table">
    <div>
      <form action="x" @submit.prevent.stop="submit">
        <!-- <input type="search" @input="onInput" :placeholder="placeholder" v-on:keyup.enter="$emit('search')"> -->
        <input type="search" @input="onInput" :placeholder="placeholder" ref="input">
      </form>
    </div>
    <div class="search" @click="submit">
      <img src="~img/sousuo.png" alt="">
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
    },
    submit() {
      this.$emit('search')
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.top .table{
  padding: 0;
  height: size(90);
}
.input-wrap{
  width: 100%;
  background: #fff;
  padding-right: 0;
  border-radius: size(10);
  padding: 0;
  margin: 0;
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  img{
    width: size(24);
  }
  .search{
    padding-right: size(15);
    width: size(80);
    text-align: right;
  }
  form{
    height: 100%;
  }
  input{
    padding:0 4px;
    font-size: size(28);
    line-height: normal;
    &::-webkit-input-placeholder{
      color: #9ea2a0;
      line-height: normal;
    }
  }
}
</style>