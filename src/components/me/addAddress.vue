<template>
  <div class="wrap">
    <top-head>{{edit ? '编辑收货地址':'新增收货地址'}}</top-head>
    <div class="col border-bottom table">
      <div><input type="text" placeholder="收货人姓名" v-model="real_name"></div>
    </div>
    <div class="col border-bottom table">
      <div><input type="number" placeholder="收货人手机" v-model="phone" pattern="[0-9]*"></div>
    </div>
    <div class="col border-bottom table" @click="$refs.selAddr.show()">
      <div>
        <label v-if="addr.length <= 0">选择地区</label>
        <span v-else>{{addr.join('   ')}}</span>
      </div>
      <div class="icon"><img src="~img/icon/join-right.png" alt="" class="right"></div>
    </div>
    <div class="detail-addr">
      <text-area class="input" placeholder="详细地址" v-model="detail" :max="0"></text-area>
    </div>
    <!-- 保存 -->
    <div class="save" @click="save">保存</div>
    <!-- 选择省市区 -->
    <city v-model="addr" ref="selAddr"></city>
  </div>
</template>

<script>
import City from 'com/common/city'
import TextArea from 'base/ui/text-area'
import {Toast} from 'lib'
import {editAddress, addAddress} from 'api/me'
export default {
  components: {
    TextArea,
    City
  },
  data() {
    return {
      real_name: '',
      phone: '',
      addr: [],
      detail: '',
      edit: false, // 是否是编辑模式，编辑新建 共用一个页面
      editId: '', // 编辑的哪一条地址
    }
  },
  created() {
    const lastAddr = this.$route.params.data
    if (lastAddr) {
      // 编辑地址
      this.edit = true
      this.editId = lastAddr.id
      this.real_name = lastAddr.real_name
      this.phone = lastAddr.phone
      this.detail = lastAddr.detail
      this.addr.push(lastAddr.province)
      this.addr.push(lastAddr.city)
      this.addr.push(lastAddr.district)
    }
  },
  methods: {
    save() {
      // 保存
      if (!this.real_name) {
        Toast('请输入收货人姓名')
        return
      }
      if (!this.phone) {
        Toast('请输入收货人手机')
        return
      }
      if (!/^1[\d]{10}$/.test(this.phone)) {
        Toast('收货人手机不正确')
        return
      }
      if (this.addr.length <= 0) {
        Toast('请选择地区')
        return
      }
      if (!this.detail) {
        Toast('请输入详细地址')
        return
      }
      // 校验过了
      if (this.edit) {
        editAddress({
          address_id: this.editId,
          real_name: this.real_name,
          phone: this.phone,
          province: this.addr[0],
          city: this.addr[1],
          district: this.addr[2],
          detail: this.detail
        }).then(data => {
          if (data) {
            Toast({
              message: '保存成功',
              duration: 1000
            })
            setTimeout(() => {
              this.$router.back()
            }, 1000)
          }
        })
      } else {
        addAddress({
          real_name: this.real_name,
          phone: this.phone,
          province: this.addr[0],
          city: this.addr[1],
          district: this.addr[2],
          detail: this.detail
        }).then(data => {
          if (data) {
            Toast('保存成功')
            setTimeout(() => {
              this.$router.back()
            }, 1000)
          }
        })
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
}
.col{
  background: #fff;
  padding: 0 size(20);
  min-height: size(86);
  font-size: size(28);
  >div{
    display: table-cell;
    vertical-align: middle;
  }
  label{
    color: #c4c4c6;
  }
  input{
    display: block;
    font-size: size(28);
    &::-webkit-input-placeholder{
      font-size: size(28);
      color: #c4c4c6;
    }
  }
  .icon{
    width: size(50);
    text-align: right;
    img{
      width: size(22);
    }
  }
}
.detail-addr{
  background: #fff;
  padding: size(20);
  .input{
    background: #fff;
    min-height: size(190);
  }
  /deep/ textarea{
    &::-webkit-input-placeholder{
      font-size: size(28);
      color: #c4c4c6;
    }
  }
}
.save{
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