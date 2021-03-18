<template>

  <div class="loadmore">
    <li class="list-title">
      <span>名称</span>
      <span>贡献值</span>
      <span>排名</span>
    </li>
    <load-more v-slot="{list}"
               :getData="getGoodsVisitor">

      <li v-for="(i,j) in list"
          class="list-item"
          :key="i.uid">
        <span>
          <img v-lazy="i.avatar" />
          {{ i.nickname }}
        </span>
        <span>{{ i.profit }}</span>
        <span>{{getRank(i,j)}}</span>
      </li>
    </load-more>
  </div>

</template>

<script>
import LoadMore from 'base/load-more'
import { getGoodsVisitor } from 'api'
export default {
  components: {
    LoadMore
  },
  props: ['id'],
  data() {
    return {
      list: [],
      num: -1,
      current: -1
    }
  },
  computed: {
    getRank() {
      return (obj, i) => {
        if (i === 0 || Number(obj && obj.profit) < Number(this.list[i - 1] && this.list[i - 1].profit)) {
          this.current = i + 1
          return i + 1
        }
        else {
          return this.current
        }
      }
    },
    getGoodsVisitor() {
      return (page, size) => getGoodsVisitor(this.id, page, size)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.loadmore {
  padding: 0 size(30);
  li {
    list-style: none;
    height: size(100);
    line-height: size(100);
    border-bottom: 1px solid #d7d7d7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 size(10);
    font-size: size(28);
    color: #666;
    img {
      height: size(50);
      width: size(50);
      vertical-align: middle;
      border-radius: 50%;
    }
    > span {
      text-align: center;
      width: 33%;
    }

    > span:nth-of-type(1) {
      padding-left: size(10);
      @include txt-overflow(1);
      text-align: left;
    }
    > span:nth-last-of-type(1) {
      padding-right: size(10);
      text-align: right;
    }
    .red {
      color: #ea1f21;
    }
    .num {
      font-weight: bold;
    }
  }
}
</style>