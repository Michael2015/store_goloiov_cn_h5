<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canGo: true
    };
  },
  methods: {
    handler(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollHeight === Math.ceil(scrollTop) + clientHeight && this.canGo) {
        this.canGo = false;
        setTimeout(() => {
          //防止ios端快速连续触底一次性请求过多现象
          this.canGo = true;
        }, 300);
        this.$emit("reach-bottom");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handler, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handler, true);
  }
};
</script>
<style lang="scss" scoped></style>
