<template>
  <div class="clock">
    <div class="title">解酒饮料</div>
    <div class="time">{{showTime}}</div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      time: null,
      showTime: ''
    };
  },
  computed: {
    doubleNum() {
      return n => {
        return n.toString().padStart(2, '0')
      }
    }
  },
  activated() {
    this.getTime()
  },
  deactivated() {
    this.time = null
  },
  methods: {
    getTime() {
      this.time = setInterval(() => {
        let date = new Date()
        this.showTime = `${date.getFullYear()}-${this.doubleNum(date.getMonth() + 1)}-${this.doubleNum(date.getDate())}
         ${this.doubleNum(date.getHours())}:${this.doubleNum(date.getMinutes())}:${this.doubleNum(date.getSeconds())}`
      }, 1000)
    }

  },


}
</script>
<style lang='scss' scoped>
@import "~css/def";
.clock {
  text-align: center;
  color: white;
  background: $color-main;
  .title {
    font-size: size(30);
    line-height: size(42);
  }
  .time {
    font-size: size(20);
    line-height: size(30);
  }
}
</style>