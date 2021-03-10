<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { Toast, Loading } from "lib";
export default {
  data() {
    return {
      canGo: true
    };
  },
  methods: {
    handler(e) {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let clientHeight = window.innerHeight || document.documentElement.clientHeight
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //Toast(window.innerHeight + '')
      //Toast(scrollHeight + '>' + Math.ceil(scrollTop) + '>' + clientHeight)
      if ((scrollHeight <= Math.ceil(scrollTop) + clientHeight) && this.canGo) {
        this.canGo = false;
        setTimeout(() => {
          //防止ios端快速连续触底一次性请求过多现象
          this.canGo = true;
        }, 500);
        this.$emit("reach-bottom");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handler, true);
    window.addEventListener("resize", this.handler, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handler, true);
    window.removeEventListener("resize", this.handler, true);
  }
};
</script>
<style lang="scss" scoped></style>
