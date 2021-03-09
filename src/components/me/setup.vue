<template>
  <div class="setup cell-size">
    <top-head>账号设置</top-head>
    <mt-cell :title="item.title"
             v-for='(item,i) in list'
             :key='i'>
      <div @click='to(item.path)'>
        <span>{{item.toname}}</span>
        <i class="iconfont">&#xe770;</i>
      </div>
    </mt-cell>
    <div class="quit">
      <div class="btn-out">退出登录</div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      list: [{
        title: '个人信息',
        path: '/myinfo',
        toname: '修改'
      },
      {
        title: '收货地址',
        path: '',
        toname: '管理我的地址'
      },
      {
        title: '分账账号',
        path: '',
        toname: '实时分账'
      },
      {
        title: '隐私协议',
        path: '',
        toname: ''
      },
      {
        title: '清除缓存',
        path: '',
        toname: '3.30M'
      }]
    };
  },
  methods: {
    to(path) {
      if (path) {
        this.$router.push(path)
      }
    }
  },
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
@import "~css/def";
.quit {
  position: absolute;
  left: 0;
  bottom: size(100);
  width: 100%;
  height: size(100);
  margin-top: size(30);
  text-align: center;
  .btn-out {
    display: inline-block;
    padding: size(20) size(50);
    margin: 0 auto;
    text-align: center;
    border-radius: size(50);
    background: #c72418;
    color: white;
    font-size: size(26);
  }
}
</style>