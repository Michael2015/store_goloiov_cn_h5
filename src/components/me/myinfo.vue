<template>
  <div class="myinfo cell-size">
    <top-head>我的个人信息</top-head>
    <mt-datetime-picker
      v-model="pickerVisible"
      type="date"
      ref="picker"
      @confirm="handleConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      cancelText="取消"
      confirmText="完成"
    >
    </mt-datetime-picker>
    <mt-cell v-for="(item, i) in list" :key="i">
      <div @click="to(item.path, item.type)">
        <span>{{ item.toname }}</span>
        <i class="iconfont">&#xe770;</i>
      </div>
      <div slot="title">
        <span>{{ item.title }}</span>
        <i class="iconfont user" v-if="item.icon">{{ item.icon }}</i>
      </div>
    </mt-cell>
  </div>
</template>

<script>
import { formatDate } from "lib/index";
export default {
  components: {},
  data() {
    return {
      pickerVisible: "2020-1-5",
      list: [
        {
          title: "头像",
          path: "",
          toname: "",
          icon: "\ue640"
        },
        {
          title: "昵称",
          path: "/modifyName",
          toname: "csacsacc",
          icon: ""
        },
        {
          title: "生日",
          path: "",
          toname: "2020-01-01",
          icon: "",
          type: "date"
        },
        {
          title: "手机号",
          path: "",
          toname: "13213131313",
          icon: ""
        }
      ]
    };
  },
  methods: {
    touchHandler(e) {
      let ele = document.querySelector(".mint-popup-bottom");
      let display = window.getComputedStyle(ele, null).display;
      if (display === "block") {
        e.preventDefault();
      }
    },
    handleConfirm(e) {
      let value = formatDate(e);
      let index = this.list.findIndex(item => item.type === "date");
      if (index !== -1) {
        this.$set(this.list[index], "toname", value);
      }
    },
    openPicker() {
      this.$refs.picker.open();
      this.isopen = true;
    },
    to(path, type) {
      if (path) {
        this.$router.push(path);
      } else if (type === "date") {
        this.openPicker();
      }
    }
  },
  mounted() {
    document.body.addEventListener("touchmove", this.touchHandler, {
      passive: false
    });

    let ele = document.createElement("span");
    ele.innerText = "选择开始日期";
    ele.className = "center-title";
    document.querySelector(".picker-toolbar").appendChild(ele);
  },
  destroyed() {
    document.body.removeEventListener("touchmove", this.touchHandler, {
      passive: false
    });
  }
};
</script>
<style lang="scss" scoped></style>
