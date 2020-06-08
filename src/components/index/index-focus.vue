<template>
  <div class="focus">
    <li
      class="foucs-tiem"
      v-for="(item,index) in list"
      :key="index"
      @click="rediect_cate(item.id,item.cate_name,item.url,item.kind)"
    >
      <img v-lazy="item.icon" />
      <label>{{item.name}}</label>
    </li>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import { getAdv } from "api";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    //之前是调用getCategory
    getAdv(1).then(data => {
     // console.log(data);
      if (data) {
        this.list = data;
      }
    });
  },
  methods: {
    rediect_cate(cate_id, cate_name, url, kind) {
     // console.log(cate_id, cate_name, url, kind);
      if (!url) {
        if (cate_name == "油卡充值" || cate_name == "VIP服务商") {
          this.$router.push({ path: "/blank" });
        } else {
          this.$router.push({ path: "/search", query: { cate_id: cate_id } });
        }
      } else {
        switch (kind) {
          case 1:
          case 2:
          case 3:
            this.$router.push(url);
            break;
          case 5:
            window.location.href = decodeURIComponent(url);
            break;
          default:
            break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.focus {
  padding: 0 size(20);
  .foucs-tiem {
    list-style: none;
    float: left;
    width: 16%;
    margin: 2% 2% size(20);
    text-align: center;
    img {
      width: 62%;
    }
    label {
      text-align: center;
      height: size(50);
      line-height: size(50);
      width: 100%;
      display: inline-block;
      font-size: size(20);
    }
  }
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>