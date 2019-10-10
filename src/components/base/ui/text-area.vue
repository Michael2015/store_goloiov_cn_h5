<template>
  <div class="text-area">
    <textarea @input="onInput" :placeholder="placeholder" v-model="v"></textarea>
    <span class="length" v-if="this.max > 0">{{this.length}}/{{this.max}}</span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      v: '',
      length: 0
    }
  },
  created() {
    if (this.value) {
      this.v = this.value
    }
  },
  methods: {
    onInput() {
      const length = this.v.length
      if (this.max > 0 && length > this.max) {
        this.v = this.v.substring(0, this.max)
        this.length = this.max
      } else {
        this.length = length
      }
      this.$emit('input', this.v)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.text-area{
  background: #fbfbfb;
  height: size(174);
  textarea{
    display: block;
    height: 100%;
    padding: 0;
    background-color: transparent;
    font-size: size(26);
    line-height: 1.4;
    &::-webkit-input-placeholder{
      font-size: size(24);
      color: #999;
    }
    word-wrap: break-word;
    word-break: break-all;
  }
  position: relative;
  .length{
    position: absolute;
    right: size(8);
    bottom: size(6);
    color: #999;
    font-size: size(24);
  }
}
</style>