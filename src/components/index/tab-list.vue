<template>
  <div class="tabList">
    <div class="top">
      <span :class="{active:index===cur}"
            @click='change(index)'
            v-for='(i,index) in tab'
            :key='index'>{{i}}</span>

    </div>
    <div v-for='(i,index) in filterTab'
         class="tab"
         :key='index'>
      <slot :name="'list'+index"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tab: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cur: 0,

    };
  },
  computed: {
    filterTab() {
      return this.tab.slice(this.cur, 1)
    }
  },
  methods: {
    change(e) {
      this.cur = e
      this.$emit('current-change', e)
    }

  },
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";

.tabList {
  position: relative;
  margin: size(20) 0;
  background: white;
  border-radius: size(16);
  .top {
    height: size(80);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 size(20);
    border-bottom: 2px solid #f6f6f6;
    font-size: size(26);
    > span {
      padding: 0 size(25);
      height: 100%;
      line-height: size(80);
      box-sizing: border-box;
      position: relative;
    }
    > .active:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      z-index: 10;
      background: #e2552a;
    }
  }
}
</style>