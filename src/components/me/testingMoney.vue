<template>
  <div class="phone_warp">
    <top-head>虚拟资产验证</top-head>
    <div class="container">
      <div class="img-m">
        <div class="img"></div>
      </div>
      <div class="desc">使用虚拟资产需要验证身份，<b>{{phonehide(inputPhone)}}</b> 为您的手机号 ，请进入手机短信验证</div>
      <div class="input-btn">
        <div class="inp">
          <input type="text" v-model="code">
        </div>
        <div class="btn-code" :class="{'no-btn': timeing }" @click="getcode">{{timeing? `${Time} s`: showTitle}}</div>
      </div>
      <div class="btn submit-btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Loading, Toast } from "lib";
import { sendCode, checkCode} from "api/buy";

export default {
  data() {
    return {
      inputPhone: "",
      enterPhone: "",
      code: "",
      Time: 0,
      timeobj: null,
      showTitle: "获取验证码"
    };
  },
  methods: {
    phonehide(phone) {
      return phone.substring(0, 3) + "****" + phone.substring(7);
    },
    async getcode() {
      if (this.timeing) return
      // 获取验证码
      const res2 = await sendCode({
        phone: this.inputPhone,
        event: 'virtual_property'
      });
      if (res2.code == 200) {
        Toast(res2.msg);
        this.Time = 60;
        this.timeobj = setInterval(() => {
          this.Time--;
          if (this.Time === 0) {
            clearInterval(this.timeobj);
            this.showTitle = "重新获取";
          }
        }, 1000);
      } else {
        Toast(res2.msg);
      }
    },
    async submit() {
      if(!this.code) return Toast('请输入验证码')
      const data = await checkCode({
        code: this.code,
        phone: this.inputPhone
      })
      if ( data.code == 200 ) {
        Toast('验证成功,正在跳转中...');
        setTimeout(() => {
          this.$store.commit('testingMoney', true)
          this.$router.go(-1)
        },2000) 
      } else {
        Toast(data.msg)
      }  
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    timeing() {
      return this.Time !== 0;
    }
  },
  mounted() {
    this.inputPhone = this.userInfo.phone || "";
  },
  watch: {
    code(val){
      if(val.length > 4){
        this.code = val.substring(0,4)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.container{
  padding: size(90) size(48) 0 size(48);
  color: #333;
  position: fixed;
  top:0;
  bottom: 0;
  .img-m{
    position: relative;
    height: size(320);
  }
  .img{
    position: absolute;
    width: size(200);
    height: size(200);
    top:size(40);
    left:50%;
    transform: translateX(-50%);
    background: #ccc;
    margin-bottom: size(50);
    @include bg('~img/testing_icon.png');
  }
  .desc{
    line-height: size(45);
  }
  .input-btn{
    padding: size(10) 0;
    border-bottom: 1px solid #eee;
    margin-top: size(60); 
    display: flex;
  }
  .inp{
    flex: 1;
    height: size(40);
    padding-top: size(15);
    input{
      height: size(40);
      line-height: size(40);
      padding-left: size(10);
    }
  }
  .btn-code{
    width: size(220);
    font-size: size(26);
    text-align: center;
    color: #fff;
    padding:size(20) 0;
    background: linear-gradient(135deg, #ff0000, #ff3061);
    border-radius: size(50);
    &.no-btn{
      color: #eee;
      background: #666;
    }
  }
  .submit-btn{
    margin-top: size(120);
    background: linear-gradient(135deg, #ff0000, #ff3061);
    border-radius: size(50);
  }
}

</style>