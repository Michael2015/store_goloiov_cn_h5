<template>
  <div v-show="isShow">
    <popup @mask-click="hide">
      <div class="wrap">
        <div class="head">
          <img :src="data.avatar" alt="">
        </div>
        <div class="col border-bottom">
          <div class="name">昵称</div>
          <div class="value">{{nickname}}</div>
          <div class="btn-inline" @click="copy">复制</div>
        </div>
        <div class="col">
          <div class="name">手机</div>
          <div class="value">{{data.phone}}</div>
          <a class="btn-inline" href="javascript:;" @click="handleCall(data.phone)">呼叫</a>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import showHide from 'mixins/show-hide'
import popup from 'ui/popup'
import {setClipboard, Toast} from 'lib'
import {mapState} from 'vuex'
import {telephone} from 'api/native'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    popup
  },
  mixins: [showHide],
  computed: {
    ...mapState(['isLogin']),
    nickname() {
      if (this.isLogin && this.data.uid === 0) {
        // 这里主要是当用户登录了，发现他是顶级合伙人，上级是uid为0的用户，他的昵称是未登录
        // 此时用户已经登录，显示未登录不行
        return '万车品'
      } else {
        return this.data.nickname
      }
    }
  },
  methods: {
    copy() {
      setClipboard(this.nickname).then(() => {
        Toast('复制成功')
      })
    },
    handleCall(p) {
      telephone(p)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/def';
.wrap{
  width: p(600/750);
  background: #fff;
  min-height: 100px;
  border-radius: 10px;
  padding: size(50);
  position: relative;
  .col{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: size(40) 0;
    line-height: 1.1;
  }
  .head{
    position: absolute;
    left: 50%;
    top: size(-90);
    margin-left: size(-144/2);
    @include circle(144);
    border: 3px solid #fff;
    background: #fff;
    overflow: hidden;
    img{
      display: block;
      @include fill;
    }
  }
  .name{
    font-size: size(28);
    color: #666;
  }
  .value{
    font-weight: 800;
    font-size: size(28);
    color: #333;
    width: 50%;
    @include txt-overflow;
    text-align: center;
    line-height: 1.4;
  }
}
</style>