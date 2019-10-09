<template>
  <div v-show="isShow">
    <div class="mask" @click="hide"></div>
    <div class="con">
      <div class="head">
        <div class="quit" @click="hide">取消</div>
        <div class="ok" @click="cb&&cb(value);hide()">确定</div>
      </div>
      <div class="sel">
        <mt-picker :slots="slots" @change="change"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
export default {
  mixins: [showHide],
  data() {
    return {
      cb: null,
      value: null,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
          visibleItemCount: 3
        }
      ]
    }
  },
  methods: {
    show(slots, cb) {
      this.isShow = true
      this.cb = cb || null
      this.slots[0].values = slots
    },
    change(ins, value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.con{
  background: #fff;
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: size(418);
  .head{
    padding: 0 size(20);
    line-height: size(100);
    height: size(100);
    font-size: size(28);
    .quit{
      float: left;
      padding-right: size(50);
    }
    .ok{
      float: right;
      color: #e31336;
      padding-left: size(50);
    }
  }
}
</style>