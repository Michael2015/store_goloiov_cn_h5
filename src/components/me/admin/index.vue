<template>
  <div class="warp">
    <top-head>申请区域管理员</top-head>
    <input type="text" placeholder="姓名" v-model="name" />
    <input type="Number" placeholder="手机" v-model="phone" />
    <div class="Apply_item" @click="openselectId">
      <div class="name">申请类型</div>
      <div class="show">{{adminObj[selectId]}}</div>
      <div class="right-icon">
        <img src="~img/icon/right.png" />
      </div>
    </div>
    <div class="Apply_item" @click="openselectCity">
      <div class="name">申请城市</div>
      <div class="show">{{addressTitle}}</div>
      <div class="right-icon">
        <img src="~img/icon/right.png" />
      </div>
    </div>
    <textarea cols="30" rows="10" placeholder="申请原因" v-model="reason"></textarea>
    <div class="Apply_record" @click="goapplyList">申请记录</div>
    <div class="Apply_btn" @click="goApply">立即申请</div>
    <select-admin ref="selectadmin"></select-admin>
    <city v-model="addr" ref="selAddr"></city>
  </div>
</template>

<script>
import selectAdmin from "./selectAdmin";
import City from "com/common/city";
import { Toast } from "lib";
import { region_partner_applye } from "api/me";
export default {
  data() {
    return {
      name: "",
      phone: "",
      selectId: 0,
      reason: "",
      adminObj: {
        "0": "请选择申请级别",
        "2": "区/县区域管理员",
        "3": "市区域管理员",
        "4": "省区域管理员"
      },
      addr: [],
      addressTitleDaili: ""
    };
  },
  components: {
    selectAdmin,
    City
  },
  methods: {
    openselectId() {
      this.$refs.selectadmin.show(id => {
        this.selectId = id;
      });
    },
    openselectCity() {
      if (this.selectId == 0) {
        Toast("请先选择申请等级");
        return;
      }
      this.addr = [];
      this.addressTitleDaili = '';
      this.$refs.selAddr.show();
    },
    goapplyList() {
      this.$router.push("/applylist");
    },
    goApply() {
      const { name, phone, selectId, addressTitleDaili, reason } = this;
      if (name.trim().length == 0) {
        Toast("请输入名字");
        return;
      }
      if (phone.trim().length == 0) {
        Toast("请输入手机号");
        return;
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(phone)) {
        Toast("请输入正确手机号");
        return;
      }
      if (selectId == 0) {
        Toast("请选择申请类型");
        return;
      }
      if (addressTitleDaili.length == 0) {
        Toast("请选择申请城市");
        return;
      }
      if (reason.trim().length == 0) {
        Toast("请输入申请原因");
        return;
      }
      region_partner_applye({
        phone,
        user_name: name,
        agent_name: addressTitleDaili,
        agent_level: selectId,
        mark: reason
      }).then(res => {
        Toast('申请成功');
        this.$router.push('/applyflag')
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
      this.addressTitleDaili = this.addr.join("-");
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
  height: 100%;
  background: #f5f5f5;
  > input {
    height: size(84);
    background-color: #ffffff;
    border: size(1) solid #f5f5f5;
    font-size: size(28);
    padding-left: size(30);
  }
  .Apply_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: size(1) solid #f5f5f5;
    height: size(84);
    background: #fff;
    padding: 0 size(30);
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
    width: 100%;
    background: #fff;
    border: size(1) solid #f5f5f5;
    padding-left: size(30);
    padding-top: size(22);
    font-size: size(28);
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