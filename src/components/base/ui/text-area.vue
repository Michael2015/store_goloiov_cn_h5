<template>
  <div class="text-area">
    <textarea @input="onInput" :placeholder="placeholder" v-model="v"></textarea>
    <span class="length">{{this.length}}/{{this.max}}</span>
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
    }
  },
  data() {
    return {
      v: '',
      length: 0
    }
  },
  methods: {
    onInput() {
      const length = this.v.length
      if (length > this.max) {
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
  min-height: size(174);
  textarea{
    min-height: size(174);
    padding: size(16) size(20);
    background: #fbfbfb;
    font-size: size(26);
    &::-webkit-input-placeholder{
      font-size: size(24);
      color: #999;
    }
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