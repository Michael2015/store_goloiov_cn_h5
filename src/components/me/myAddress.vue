<template>
  <div class="wrap">
    <div class="addr-wrap" v-for="item in addrList" :key="item.id" @click="select(item)">
      <div class="base">
        <img src="~img/icon/location.png" alt="">
        <span>{{item.province}} {{item.city}} {{item.district}}</span>
      </div>
      <div class="detail">
        {{item.detail}}
        <img src="~img/icon/del.png" alt="" class="del" v-if="canEdit" @click.stop="deleteAddress(item.id)">
        <img src="~img/icon/edit-1.png" alt="" class="edit" v-if="canEdit" @click.stop="edit(item)">
      </div>
      <div class="contact">{{item.real_name}}    {{item.phone}}</div>
    </div>
    <div v-if="addrList.length === 0" class="no-data">
      暂无数据
    </div>
    <confirm ref="confirm">是否删除该地址？</confirm>
    <div class="blank"></div>
    <router-link class="add" tag="div" to="/addAddress">新增地址</router-link>
  </div>
</template>

<script>
import {getAddressList, delAddress} from 'api/me'
import {Loading} from 'lib'
import Confirm from "base/confirm"
export default {
  components: {
    Confirm
  },
  data() {
    return {
      // 买商品是选择地址要禁用编辑
      canEdit: true,
      addrList: []
    }
  },
  created() {
    if (this.$route.query.select) {
      // 选择地址模式，禁用编辑和删除按钮
      this.canEdit = false
    }
    this.loaddata()
  },
  methods: {
    loaddata() {
      Loading.open()
      getAddressList().then(data => {
        if (data) {
          this.addrList = data
          Loading.close()
        }
      })
    },
    deleteAddress(id) {
      this.$refs.confirm.show('', () => {
        delAddress(id).then(() => {
          this.loaddata()
        })
      })
    },
    edit(item) {
      this.$router.push({
        name: 'addAddress',
        params: {
          data: item
        }
      })
    },
    select(item) {
      if (this.$route.query.select) {
        this.$store.commit('setAddress', item)
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~css/def";
.wrap{
  min-height: 100vh;
  background-color: $color-body-bg;
  position: relative;
  .blank{
    height: size(110);
  }
}
.addr-wrap{
  background: #fff;
  padding: size(20) size(30);
  margin-bottom: size(20);
  .base{
    line-height: size(46);
    img{
      float: left;
      width: size(46);
      margin-right: size(12);
    }
    span{
      font-size: size(26);
    }
  }
  .detail{
    font-size: size(36);
    line-height: 1.4;
    word-break: break-all;
    word-wrap: break-word;
    margin: size(9) 0 size(16);
    padding-right: size(120);
    position: relative;
    img{
      width: size(38);
      position: absolute;
      top: 0;
      right: 0;
    }
    .del{
      right: size(36 + 38);
    }
  }
  .contact{
    font-size: size(26);
    line-height: 1.4;
  }
  position: relative;
  .right{
    position: absolute;
    right: size(30);
    top: 50%;
    width: 12px;
    margin-top: -8px;
  }
}
.no-data{
  text-align: center;
  padding: size(50) 0;
  color: #999;
  font-size: size(30);
}
.add{
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
</style>