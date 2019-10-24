<template>
  <div class="bao">
    <top-head>升级攻略</top-head>
    <div class="warp">
      <strategy-header :levelId="myLevelId" v-if="myLevelId <5"></strategy-header>
      <strategy-item type="my" :levelId="myLevelId"></strategy-item>
      <strategy-item type="next" v-if="myLevelId < 5" :levelId="myLevelId+1"></strategy-item>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import strategyItem from "./strategyItem";
import strategyHeader from "./strategyHeader";
export default {
  data() {
    return {
      myLevelId: 0
    };
  },
  mounted() {
    this.myLevelId = this.userInfo.partner_level
    // this.myLevelId = 0;
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    strategyItem,
    strategyHeader
  }
};
</script>

<style lang="scss" scoped>
@import "css/def";
.bao {
  width: 100%;
  height: 100%;
  overflow: auto;
  .warp {
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    overflow: auto;
  }
}
</style>