<template>
  <div class="myvip">
    <top-head>我的会员</top-head>
    <mt-cell title="我的会员">
      <span>100人</span>
      <img slot="icon"
           class="cicle-img"
           src="~img/alipay.png"
           width="24"
           height="24">
    </mt-cell>
    <div class="search">
      <mt-search v-model="value"
                 cancel-text="×"
                 placeholder="搜索">

      </mt-search>
    </div>

    <div class="list">
      <ul v-for='i in 10'
          :key='i'>
        <img src="~img/alipay.png" />
        <li>我是谁scscss</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      value: ''
    };
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
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