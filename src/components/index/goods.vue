<template>
  <div>
    <goods-partner :id="id"></goods-partner>
  </div>
</template>

<script>
import GoodsPartner from "./goods/goods-partner";

import { mapState } from "vuex";
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  components: {
    GoodsPartner
  }
};
</script>

<style lang="scss" scoped></style>
