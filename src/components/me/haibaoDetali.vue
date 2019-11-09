<template>
  <div class="wrap">
    <div class="thunder">
      <img src="~img/me/commodity_share_poster.png" class="icon" />
    </div>
    <img src="~img/me/footer.png" class="foot" />
    <div class="save_btn">保存到相册</div>
  </div>
</template>

<script>
import { getQrcode } from "api";
import { mapState } from 'vuex'
export default {
  mounted() {
    console.log(this.$route.query.url);
    getQrcode([this.userInfo.uid, this.userInfo.uid,0,'invite'].join(",")).then(res=>{
      console.log(res)
    })
  },
  computed: {
    ...mapState(["userInfo"])
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap .thunder img {
  width: 100%;
}
.foot {
  box-sizing: border-box;
  width: 100%;
  padding: 0 size(30) 0 size(30);
  height: size(138);
  position: fixed;
  bottom: size(136);
}
.wrap .save_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #e31336;
  color: #fff;
  height: size(100);
  line-height: size(100);
  text-align: center;
  font-size: size(30);
}
</style>