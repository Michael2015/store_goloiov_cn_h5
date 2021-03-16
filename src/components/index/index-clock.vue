<template>
  <div class="clock">{{showTime}}</div>
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
  margin: size(20) size(30);
  font-size: size(24);
  text-align: right;
  color: gray;
}
</style>