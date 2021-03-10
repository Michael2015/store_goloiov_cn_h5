<template>
  <div class="departCount">
    <top-head>绑定支付宝账号</top-head>
    <div class="content"
         v-for='(item,i) in list'
         :key='i'>
      <i class="iconfont">{{item.icon}}</i>
      <input type="text"
             :placeholder="item.placeholder"
             v-model='item.value'>
    </div>

    <div class="tip">
      <div><i class="iconfont">&#xe649;</i>提示</div>
      <p>1、打开支付宝App,点击菜单栏“我的”，点击左上角头像即可查看支付宝账号以及实名姓名。</p>
      <p>2、绑定支付账号用于平台奖励实时分账，必须填写支付宝真实信息。</p>
    </div>
    <div class="sure">我已确认</div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      username: '',
      list: [{
        placeholder: '输入支付宝绑定手机号',
        icon: '\ue608',
        value: ''
      },
      {
        placeholder: '输入支付宝真实账号',
        icon: '\ue68a',
        value: ''
      },
      {
        placeholder: '输入支付宝认证姓名',
        icon: '\ue625',
        value: ''
      }]
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
.departCount {
  margin: 0 size(40);
  .content {
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    height: size(80);
    margin: size(30) 0;
    padding: 0 size(30);
    .iconfont {
      margin-right: size(10);
      font-size: size(40);
      color: #888;
    }
    input {
      height: 100%;
      vertical-align: middle;
    }
    input::-webkit-input-placeholder {
      height: 100%;
      vertical-align: middle;
      line-height: size(50);
    }
  }
  .tip {
    margin-top: size(100);
    font-size: size(26);
    .iconfont {
      margin-right: size(10);
    }
    p {
      margin: size(10) 0;
      line-height: size(40);
    }
  }
  .sure {
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    line-height: size(100);
    height: size(100);
    text-align: center;
    width: 100%;
    background: #e31336;
    color: #fff;
    font-size: size(30);
  }
}
</style>