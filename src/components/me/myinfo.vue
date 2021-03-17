<template>
  <div class="myinfo cell-size">
    <top-head>我的个人信息</top-head>
    <mt-datetime-picker v-model="pickerVisible"
                        type="date"
                        ref="picker"
                        :startDate="new Date('1900/01/01')"
                        :endDate="new Date()"
                        @confirm="handleConfirm"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        cancelText="取消"
                        confirmText="完成">
    </mt-datetime-picker>
    <mt-cell v-for="(item, i) in list"
             :key="i">
      <div @click="to(item.path, item.type)">
        <span v-if="item.name !== 'avatar'">{{ item.toname }}</span>
        <i class="iconfont">&#xe770;</i>
      </div>
      <div slot="title">
        <span>{{ item.title }}</span>
        <i class="iconfont user"
           v-if="item.icon">{{ item.icon }}</i>
        <img class="avatar"
             :src="item.toname"
             v-if="item.name === 'avatar' && item.toname" />
      </div>
    </mt-cell>
    <div class="add"
         @click="sure">确认</div>
  </div>
</template>

<script>
import { formatDate, Loading } from "lib/index";
import { getMyUserInfo, editUserInfo } from "api/me";
import hasToken from "mixins/hasToken";

export default {
  mixins: [hasToken],
  components: {},
  data() {
    return {
      myinfo: {},
      pickerVisible: "2000/01/01",
      list: [
        {
          title: "头像",
          path: "",
          toname: "",
          icon: "",
          name: "avatar"
        },
        {
          title: "昵称",
          path: "/modifyName",
          toname: "",
          icon: "",
          name: "nickname"
        },
        {
          title: "生日",
          path: "",
          toname: "",
          icon: "",
          type: "date",
          name: "birthday"
        },
        {
          title: "手机号",
          path: "",
          toname: "",
          icon: "",
          name: "phone"
        }
      ]
    };
  },
  methods: {
    mixinInit() {
      document.body.addEventListener("touchmove", this.touchHandler, {
        passive: false
      });
      this.initData();
    },
    editUserInfo(obj) {
      Loading.open();
      editUserInfo(obj)
        .then(() => {
          this.$router.push("/me");
        })
        .finally(() => {
          Loading.close();
        });
    },
    initData() {
      let obj = this.$store.state.currentData;
      if (!obj) {
        this.getMyUserInfo();
      } else {
        for (let i in this.list) {
          this.list[i].toname = obj[this.list[i].name] || "";
          if (this.list[i].type === "date") {
            this.pickerVisible = obj[this.list[i].name] || "2020/01/01";
          }
        }
      }
    },
    sure() {
      let obj = {};
      for (let i of this.list) {
        obj[i.name] = i.toname;
      }
      let pams = {
        nickName: obj.nickname,
        //headImg: obj.avatar,
        birthday: obj.birthday
      };
      this.$store.commit("setMeInfo", null);
      this.editUserInfo(pams);
    },
    getMyUserInfo() {
      Loading.open();
      getMyUserInfo()
        .then(res => {
          for (let i in this.list) {
            this.list[i].toname = res[this.list[i].name] || "";
            if (this.list[i].type === "date") {
              this.pickerVisible = res[this.list[i].name] || "2020/01/01";
            }
          }
        })
        .finally(() => {
          Loading.close();
        });
    },
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
      this.pickerVisible = value;
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
        this.$store.commit("setCurrentData", this.formatList);
        this.$router.push(path);
      } else if (type === "date") {
        this.openPicker();
      }
    },
    appendTextToDate() {
      let ele = document.createElement("span");
      ele.innerText = "选择开始日期";
      ele.className = "center-title";
      document.querySelector(".picker-toolbar").appendChild(ele);
    }
  },
  computed: {
    formatList() {
      let obj = {};
      for (let i of this.list) {
        obj[i.name] = i.toname;
      }
      return obj;
    }
  },
  mounted() {
    this.appendTextToDate();
  },
  destroyed() {
    document.body.removeEventListener("touchmove", this.touchHandler, {
      passive: false
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/modifyName") {
      this.$store.commit("setCurrentData", null);
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";

.add {
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
