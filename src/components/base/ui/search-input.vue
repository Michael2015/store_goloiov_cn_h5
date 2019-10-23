<template>
  <div class="input-wrap table">
    <div>
      <form action="x" @submit.prevent.stop="submit">
        <!-- <input type="search" @input="onInput" :placeholder="placeholder" v-on:keyup.enter="$emit('search')"> -->
        <input type="search" @input="onInput" :placeholder="placeholder">
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.input-wrap{
  width: 100%;
  background: #fff;
  padding: 0 size(20);
  padding-right: 0;
  height: size(70);
  border-radius: size(35);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  img{
    width: size(24);
  }
  .search{
    padding-left: size(20);
    padding-right: size(20);
  }
  input{
    padding:0 4px;
    font-size: size(28);
    height: size(50);
    line-height: size(50);
    &::-webkit-input-placeholder{
      color: #9ea2a0;
      line-height: size(50);
    }
  }
}
</style>