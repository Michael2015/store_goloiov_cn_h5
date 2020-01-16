<template>
  <div class="wrap">
    <div class="black_content">
       <img src="~img/blank.png" />
       <p>开发中，敬请期待！</p>
    </div>
  </div>
</template>
<script>

export default {
   props: {
    fliter: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data() {
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  background: $color-body-bg;
  min-height: 100vh;
  text-align: center;
}
.wrap .black_content{
  width: 100%;
  >img{
    width: 70%;
    margin-top:50%;
  }
  >p{
    color: #999;
    padding: size(30) 0;
  }
}
</style>