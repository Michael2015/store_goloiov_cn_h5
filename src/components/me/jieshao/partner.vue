<template>
  <div>
    <top-head>合伙人及访客介绍</top-head>
    <img :src="src" alt />
  </div>
</template>

<script>
import { getresource } from "api/me";
import { Loading } from "lib";
export default {
  data() {
    return {
      src: ""
    };
  },
  async mounted() {
    Loading.open();
    const reque = await getresource();
    this.src = reque.operation["spec"];
    Loading.close();
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>