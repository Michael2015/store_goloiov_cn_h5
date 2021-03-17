import {
  mapState
} from "vuex";

export default {
  computed: {
    ...mapState(['uniqueNum'])
  },
  created() {
    if (this.uniqueNum) {
      this.mixinInit && this.mixinInit()
    }
  },
  watch: {
    uniqueNum(val) {
      if (val) {
        this.mixinInit && this.mixinInit()
      }
    }
  }

}
