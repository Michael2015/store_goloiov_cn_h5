<template>
  <div>
    <!-- 商品下面的图文详情页面 -->
    <img class="img" v-lazy="all.image" />
    <div v-html="all.description" id="goodsDesc"></div>
  </div>
</template>

<script>
import { getIndexProductDetail } from "api";
import { mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      all: {}
    };
  },
  computed: {
    ...mapState(["role"])
  },
  created() {
    const func = getIndexProductDetail;
    func(this.id).then(data => {
      if (data) {
        this.all = data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
#goodsDesc {
  padding: 0 size(20);
}
.img {
  width: 100%;
}
</style>

<style>
#goodsDesc img {
  width: 100%;
}
</style>
