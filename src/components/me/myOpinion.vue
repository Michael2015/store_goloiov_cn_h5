<template>
  <div class="opinion_warp">
    <top-head>反馈意见</top-head>
    <div class="input-wrap border-bottom">
      <input type="number" v-model="phone" placeholder="请输入联系手机号" pattern="[0-9]*" />
    </div>
    <div class="reasons">
      <div class="more">
        <img src="~img/icon/typo.png" alt />
        <textarea type="text" placeholder="如您在使用的过程中遇到问题，请描述您的问题并留下手
机号码，我们将尽快与您联系。" v-model="question"></textarea>
      </div>
      <div class="imgs">
        <select-img v-model="imglist"></select-img>
      </div>
    </div>
    <div class="submit_btn" @click="submit">提交反馈</div>
  </div>
</template>

<script>
import SelectImg from "com/common/select-img";
import { Loading, Toast } from "lib";
import { feedback } from "api/me";
export default {
  components: {
    SelectImg
  },
  data() {
    return {
      phone: "", //输入手机号
      question: "", // 输入意见
      imglist: [] // 上传的文件
    };
  },
  methods: {
    submit() {
      const {question,phone,imglist} = this
      if (!question) {
        Toast("请填写评论内容");
        return;
      }
      if (!phone) {
        Toast("请填写联系手机号");
        return;
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(phone)) {
        Toast("请填写正确手机号");
        return;
      }
      Loading.open();
      feedback({question,phone,imglist}).then(res=>{
          console.log(res);
          Loading.close();
          if(res.code === 200){
              Toast('您的反馈已提交，我们将尽快回复您');
              this.$router.back();
          }else{
              Toast('提交失败，请稍后再试')
          }
      })
    }
  },
  watch: {
    phone(val){
      if(val.length > 11){
        this.phone = val.substring(0,11);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.opinion_warp {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .input-wrap{
    display: flex;
    align-items: center;
    height: size(120);
    padding: 0 size(32);
    background: #fff;
    input {
      &::-webkit-input-placeholder {
        font-size: size(30);
        color: #d9dad9;
      }
    }
  }
  .reasons {
    background: #fff;
    padding-left: size(20);
    padding-top: size(16);
    .more {
      padding-left: size(32);
      padding-right: size(20);
      padding-bottom: size(20);
      position: relative;
      background: #fff;
      img {
        position: absolute;
        left: size(0);
        top: size(12);
        width: size(32);
      }
      textarea {
        // background: gold;
        height: size(190);
        padding: 4px;
        padding-left: 8px;
        font-size: size(28);
        line-height: 1.4;
        &::-webkit-input-placeholder {
          font-size: size(24);
          color: #d9dad9;
        }
      }
    }
    .imgs {
      padding: size(20) 0;
      padding-right: size(20);
    }
  }
  .submit_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    font-size: size(30);
    color: #fff;
    text-align: center;
    background-color: #e31336;
  }
}
</style>