<template>
  <div class="wrap">
    <top-head>海报</top-head>
    <div class="thunder">
      <img :src="url"
           class="icon" />
    </div>
    <div class="save_btn"
         @click="createPoster">保存到相册</div>
  </div>
</template>

<script>
import { getQrcode } from "api";
import { createPosterImage } from "api/me";
import { sharePoster } from "api/native";
import { mapState } from "vuex";
import { Toast, Loading } from "lib";
import haibaoPoster from "lib/poster-haibao";

export default {
  data() {
    return {
      imgObj: {},
      url: "",
      canClick: false
    };
  },
  async mounted() {
    // 生成海报
    this.imgObj.poster_img_url = this.updateUrl(this.$route.query.url);
    this.imgObj.poster_name = this.$route.query.name;
    Loading.open();
    await getQrcode(
      [this.userInfo.uid, this.userInfo.uid, 0, "invite"].join(",")
    ).then(res => {
      this.imgObj.qrcode_img_url = res;
    });
    createPosterImage(this.imgObj).then(
      res => {
        this.poster = new haibaoPoster();
        this.url = res.img_url;
        this.poster
          .drawAllcode(res.img_url)
          .then(
            () => {
              this.poster.base64 = this.poster
                .getBase64()
                .replace("data:image/png;base64,", "");
              this.canClick = true;
            },
            () => {
              this.poster = null;
            }
          )
          .finally(() => {
            Loading.close();
          });
        Loading.close();
      },
      msg => {
        Toast(msg);
        Loading.close();
      }
    );
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    updateUrl(url) {
      return url.split(".com/")[1];
    },
    createPoster() {
      if (!this.canClick) {
        return;
      }
      if (this.poster) {
        sharePoster(this.poster.base64);
        // this.downloadIamge(this.poster.base64, 'haibao')
        return;
      }

    },
    downloadIamge(imgsrc, name) {
      // //下载图片地址和图片名
      var image = new Image();
      // // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      var a = document.createElement("a"); // 生成一个a元素
      a.href = imgsrc
      a.download = name || 'photo'
      // 触发点击
      document.body.appendChild(a)
      a.click()
      image.src = imgsrc;
      // 然后移除
      document.body.removeChild(a)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap .thunder img {
  width: 100%;
}
.thunder {
  padding-bottom: size(100);
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