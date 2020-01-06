<template>
  <div class="warp">
    <top-head>VIP服务商申请详情</top-head>
    <div class="item">
      <div class="left">审核状态</div>
      <div class="red">{{applyObj[showObj.status]}}</div>
    </div>
    <div class="item">
      <div class="left">姓名</div>
      <div class="pink">{{showObj.name}}</div>
    </div>
    <div class="item">
      <div class="left">手机</div>
      <div class="pink">{{showObj.phone}}</div>
    </div>
    <div class="item">
      <div class="left">门店名称</div>
      <div class="pink">{{showObj.shop_name}}</div>
    </div>
    <div class="item">
      <div class="left">门店地址</div>
      <div class="pink">{{showObj.region}}</div>
    </div>
    <div class="item">
      <div class="left">详细地址</div>
      <div class="pink">{{showObj.address}}</div>
    </div>
    <div class="imgs">
        <label>门店照片</label>
        <div class="item2" v-for="(item, index) in showObj.shop_imgs" :key="item.name + ' ' + index">
            <div class="img"><img :src="item" alt=""></div>
        </div>
    </div>
    <div class="imgs">
        <label>营业执照</label>
         <div class="item" v-for="(item, index) in showObj.license_imgs" :key="item.name + ' ' + index">
            <div class="img"><img :src="item" alt=""></div>
          </div>
    </div>

    <div class="imgs">
        <label>申请原因</label>
        <div cols="30" class="pink textarea" rows="10">{{showObj.apply_reason}}</div>
    </div>
  </div>
</template>

<script>
import { get_vip_apply_log_detail } from "api/me";
export default {
  data() {
    return {
      showObj: {},
      applyObj: {
        "0": "审核中",
        "1": " 已通过",
        "-1": "已驳回"
      },
    };
  },
  mounted() {
    const id = this.$route.query.id;
    get_vip_apply_log_detail(id).then(res => {
      this.showObj = res;
    });
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
  .left {
    color: #333333;
  }
  .red {
    color: #fe0000;
  }
  .pink {
    color: #c4c4c6;
  }
  > input {
    height: size(84);
    background-color: #ffffff;
    border: size(1) solid #f5f5f5;
    font-size: size(28);
    padding-left: size(30);
  }
  > .item {
    height: size(84);
    display: flex;
    justify-content: space-between;
    padding: 0 size(30);
    align-items: center;
    font-size: size(28);
    background: #fff;
    border: size(1) solid #f5f5f5;
  }
  > .imgs{
    background: #ffffff;
    padding-left:size(30);
    justify-content: space-between;
    padding: 0 size(30);
    align-items: center;
    label{
      display:inline-block;
      width:100%;
      height:size(84);
      line-height: size(84);
      font-size: size(28);
    }
    .img>img{
        width: 23%;
        display: block;
        float: left;
        box-shadow: 0px 1px 9px 0px rgba(225, 225, 225, 0.5);
        margin-right:2%
    }
  }
  .textarea {
    width: 100%;
    font-size: size(28);
    margin-bottom: size(80);
  }
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #c4c4c6;
}
</style>