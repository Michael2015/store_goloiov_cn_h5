<template>
  <div class="warp">
    <top-head>申请VIP服务商</top-head>
    <input type="text" placeholder="姓名" v-model="name" />
    <input type="number" placeholder="手机" v-model="phone" />
    <input type="text" placeholder="门店名称" v-model="shop_name" />
    <div class="Apply_item" @click="openselectCity">
      <div class="name">门店地址</div>
      <div class="show">{{addressTitle}}</div>
      <div class="right-icon">
        <img src="~img/icon/right.png" />
      </div>
    </div>
    <input type="text" placeholder="详细地址" v-model="address" />
    <div class="imgs">
        <label>门店照片（1-5张）</label>
        <select-img v-model="shop_imgs"  :max="5"></select-img>
    </div>
    <div class="imgs">
        <label>营业执照（1-3张）</label>
        <select-img2 v-model="license_imgs" :max="3"></select-img2>
    </div>
    <textarea cols="30" rows="15" placeholder="申请原因" v-model="reason"></textarea>
    <div class="Apply_record" @click="vipApplyList">申请记录</div>
    <div class="Apply_btn" @click="goApply">立即申请</div>
    <city v-model="addr" ref="selAddr"></city>
  </div>
</template>

<script>
import SelectImg from "com/common/select-img";
import SelectImg2 from "com/common/select-img2";
import City from "com/common/city";
import { Toast } from "lib";
import { apply_vip } from "api/me";
export default {
  data() {
    return {
      name: "",
      phone: "",
      address:"",
      selectId: 0,
      region:"",
      shop_name:"",
      reason: "",
      addr: [],
      shop_imgs:[],
      license_imgs:[],
    };
  },
  components: {
    City,
    SelectImg,
    SelectImg2
  },
  methods: {
    openselectCity() {
      this.addr = [];
      this.region = '';
      this.$refs.selAddr.show();
    },
    vipApplyList() {
      this.$router.push("/vipApplyList");
    },
    goApply() {
      const { name,phone,address,addr,reason,shop_name,shop_imgs,license_imgs} = this;
      let addr2 = addr.join(" ");
      if (name.trim().length == 0) {
        Toast("请输入名字");
        return;
      }
      if (phone.trim().length == 0) {
        Toast("请输入手机号");
        return;
      }
      if (shop_name.trim().length == 0) {
        Toast("请输入门店名称");
        return;
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(phone)) {
        Toast("请输入正确手机号");
        return;
      }
      if (addr2.length == 0) {
        Toast("请选择门店地址");
        return;
      }
      if (shop_imgs.length == 0) {
        Toast("请上传1-5张门店照片");
        return;
      }
      if (license_imgs.length == 0) {
        Toast("请上传营业执照");
        return;
      }
      if (address.trim().length == 0 ||  address.trim().length > 300) {
        Toast("请输入详细地址（0-300字符）");
        return;
      }
      if (reason.trim().length == 0 || reason.trim().length > 300) {
        Toast("请输入申请原因（0-300字符）");
        return;
      }
    
      apply_vip({
        phone,
        name: name,
        region: addr2,
        address: address,
        reason: reason,
        shop_name:shop_name,
        shop_imgs:shop_imgs,
        license_imgs:license_imgs,
      }).then(res => {
        Toast('申请成功');
        this.$router.push('/vipApplyFlag')
      }, msg => {
        Toast(msg)
      });
    }
  },
  computed: {
    addressTitle() {
      if (this.addr.length === 0) {
        return;
      }
      if (this.selectId === 2) {
      } else if (this.selectId === 3) {
        this.addr.pop();
      } else if (this.selectId === 4) {
        this.addr.pop();
        this.addr.pop();
      }
      return this.addr.join("-");
    }
  },
  watch: {
    phone(v, vv) {
      if (v.length > 11) {
        this.phone = vv;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.warp {
  width: 100%;
  background: #f5f5f5;
  overflow: hidden;
  margin-bottom: size(150);
  > input {
    height: size(84);
    background-color: #ffffff;
    border: size(1) solid #f5f5f5;
    font-size: size(28);
    padding-left: size(30);
  }
  > .imgs{
    background: #ffffff;
    padding-left:size(30);
    label{
      display:inline-block;
      width:100%;
      height:size(84);
      line-height: size(84);
      font-size: size(28);
    }
  }
  .Apply_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: size(1) solid #f5f5f5;
    height: size(84);
    background: #fff;
    padding: 0 4%;
    .name {
      font-size: size(28);
      color: #333333;
    }
    .show {
      flex: 1;
      font-size: size(28);
      color: #333333;
      padding-left: size(20);
    }
    .right-icon {
      width: size(10);
      height: 100%;
      display: flex;
      align-items: center;
      > img {
        width: 100%;
        height: size(18);
      }
    }
  }
  > textarea {
    background: #fff;
    padding-left: size(30);
    padding-top: size(22);
    font-size: size(28);
    width: 100%;
    height:size(250);
    display: block;
  }
  .Apply_record {
    position: fixed;
    left: 50%;
    bottom: size(122);
    transform: translateX(-50%);
    font-size: size(26);
    letter-spacing: size(1);
    color: #0091ff;
  }
  .Apply_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: size(100);
    line-height: size(100);
    text-align: center;
    background-color: #e31336;
    color: #ffffff;
    letter-spacing: size(1);
    font-size: size(30);
  }
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #c4c4c6;
}
</style>