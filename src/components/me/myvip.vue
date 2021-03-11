<template>
  <div class="myvip">
    <top-head>我的会员</top-head>
    <mt-cell title="我的会员">
      <span>{{ list.length }}人</span>
      <img slot="icon"
           class="cicle-img"
           :src="getImg"
           width="24"
           height="24" />
    </mt-cell>
    <div class="search">
      <mt-search v-model="value"
                 cancel-text="×"
                 placeholder="搜索">
      </mt-search>
    </div>

    <div class="list">
      <ul v-for="i in searchList"
          :key="i.uid">
        <img :src="i.avatar" />
        <li>{{ i.nickname }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMyFriends } from "api/me.js";

export default {
  components: {},
  data () {
    return {
      value: "",
      list: [],
      searchList: []
    };
  },
  watch: {
    value (val) {
      if (val) {
        this.searchList = this.list.filter(item => item.nickname.includes(val));
      } else {
        this.searchList = this.list;
      }
    }
  },
  computed: {
    getImg () {
      let info = this.$store.state.userInfo;
      return info ? info.avatar : "";
    }
  },
  methods: {
    getMyFriends () {
      getMyFriends()
        .then(res => {
          this.list = res || [];
          this.searchList = res || [];
        })
        .catch(e => {
          this.$notice.show(e, () => {
            this.$router.back();
          });
        });
    }
  },
  mounted () {
    this.getMyFriends();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.search {
  margin-top: size(20);
}
.list {
  display: flex;
  flex-wrap: wrap;
  padding: size(40) size(20);
  > ul {
    width: 20%;
    margin: size(10) 2.5%;
    text-align: center;
    img {
      width: 60%;
      border-radius: 50%;
    }
    li {
      font-size: size(28);
      margin-top: size(10);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
