<template>

  <div class="wrap"
       ref="wrap"
       @touchstart="touchstart"
       @touchmove="touchmove">
    <li v-for='i in 10'
        style="height:100px"
        :key='i'>{{i}}</li>
  </div>

</template>

<script>
export default {
  data () {
    return {
      type: 'touch'
    }
  },
  methods: {
    touchstart (event) {
      this.lastY = event.changedTouches[0].clientY // 点击屏幕时记录最后一次Y坐标
    },
    touchmove (event) {
      let y = event.changedTouches[0].clientY
      let st = this.$refs.wrap.scrollTop // 滚动条高度
      if (y >= this.lastY && st <= 0) { //若滚动到顶部且为下拉情况
        this.lastY = y
        event.preventDefault()
      }
      let clientHeight = document.querySelector('.wrap').clientHeight
      let scrollHeight = document.querySelector('.wrap').scrollHeight
      if ((st + clientHeight === scrollHeight) && y < this.lastY) { // 若滚动到底部且为上拉情况
        this.lastY = y
        event.preventDefault()
      }
      this.lastY = y
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
@import "~css/def";
.wrap {
  height: 100%;
  padding: size(100) 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  background: yellow;
}
</style>