<template>
  <div class="frame-wrap notice">
    <div class="frame" :class="{out:n>0&&n%2===1,in:n>0&&n%2===0}">{{n%2===0?now:last}}</div>
    <div class="frame" :class="{in:n>0&&n%2===1,out:n>0&&n%2===0}">{{n%2===1?now:last}}</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      n: 0
    }
  },
  computed: {
    last() {
      return this.msg[this.index(this.n-1)]
    },
    now() {
      return this.msg[this.index(this.n)]
    }
  },
  methods: {
    index(n) {
      return (n + this.msg.length) % this.msg.length
    }
  },
  created() {
    this.msgTimer = setInterval(() => {
      this.n++
    }, 4000)
  },
  beforeDestroy() {
    if (this.msgTimer) {
      clearInterval(this.msgTimer)
      this.msgTimer = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.frame-wrap{
  overflow: hidden;
}
.notice{
  line-height: size(44);
  height: size(44);
  text-align: center;
  padding: 0 size(20);
  font-size: size(22);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // background-color: #4a2f08;
  // opacity: 0.87;
  // border-top-right-radius: size(25);
  // border-bottom-right-radius: size(25);
}
.frame{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  text-indent: size(20);
  &:first-child{
    top: 0;
  }
  &:last-child{
    top: size(62);
  }
  img{
    display: inline-block;
    width: size(30);
    vertical-align: middle;
    margin-right: size(12);
  }
}
.in{
  animation: in .8s ease-out;
  animation-fill-mode: forwards;
}
.out{
  animation: out .8s ease-out;
  animation-fill-mode: forwards;
}
@keyframes in {
  from{
   top: size(62);
  }
  to{
    top: 0;
  }
}
@keyframes out {
  0%{
    top:0;
  }
  to{
    top: size(-62);
  }
}
</style>