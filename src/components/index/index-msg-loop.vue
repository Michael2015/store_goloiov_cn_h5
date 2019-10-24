<template>
  <div class="msg-wrap">
    <msg-loop :msg="list" v-if="list.length > 0"></msg-loop>
  </div>
</template>

<script>
import MsgLoop from 'base/msg-loop'
import {getIndexNotice} from 'api'
export default {
  components: {
    MsgLoop
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    getIndexNotice().then(data => {
      if (data) {
        this.list = data.content
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.msg-wrap{
  color: #ff383c;
  background-color: rgba(#453d3d, .68);
  position: fixed;
  left:0;
  bottom: size(100);
  z-index: 9;
  width: 100%;
}
</style>