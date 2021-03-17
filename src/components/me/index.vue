<template>
  <div class="me_warp">
    <div class="header">
      <div class="head_top">
        <div class="part_left">
          <i class="iconfont user" v-if="!token">&#xe640;</i>
          <img :src="userinfo.avatar" v-else class="user" />
          <span>{{ userinfo.nickname || "游客" }}</span>
          <span>&nbsp;|&nbsp;</span>
          <span>{{ userinfo.grade || "普通用户" }}</span>
        </div>
        <div class="part_right" v-if="token">
          <router-link to="/myhaibao" tag="i" class="iconfont code"
            >&#xe646;</router-link
          >
          <i class="iconfont setup" @click="$router.push('/setup')">&#xe60b;</i>
        </div>
        <div class="login-btn" v-else @click="login">登录/注册</div>
      </div>
      <div class="head_body">
        <div class="count" v-for="(ele, i) in headData" :key="i">
          <div>{{ token ? ele.num : 0 }}</div>
          <div>{{ ele.title }}</div>
        </div>
      </div>
    </div>
    <div>
      <my-charts :option="option" key="1" />
    </div>
    <div class="vertical_tab">
      <div
        class="vertical_item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="to(item.path ? item.path : '')"
      >
        <div class="left">
          <i class="iconfont">{{ item.icon }}</i
          >&nbsp;
          <div class="title">{{ item.tit }}</div>
        </div>
        <div class="right">
          <span>{{ item.afterTit }}</span>
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
    </div>

    <confirm ref="logOut">确定退出吗？</confirm>
    <notice ref="notice"></notice>
  </div>
</template>
<script>
import tojump from "mixins/tojump";
import {
  partnerNum,
  updateUserInfo,
  get_region_partner,
  get_vip_server,
  getUserHomeInfo,
  getScorePrice
} from "api/me";
import { mapState } from "vuex";
import partnerLevelObj from "mixins/partner-level-obj";
import { login, logout } from "api/login";
import confirm from "base/confirm";
import notice from "base/notice";
import myCharts from "com/common/echarts";
import { Loading } from "lib/index";
export default {
  data() {
    return {
      option: {},
      userinfo: {},
      headData: [
        {
          num: 1,
          title: "我的积分",
          name: "score"
        },
        {
          num: 0,
          title: "我的收益",
          name: "profit"
        },
        {
          num: 0,
          title: "我的贡献值",
          name: "contribution"
        },
        {
          num: 0,
          title: "股东排名",
          name: "grade_rank"
        }
      ],
      /* tabList: [
        {
          img: require("img/me/jifen.png"),
          tit: "我的积分",
          path: "/jifen"
        },
        {
          img: require("img/me/Poster.png"),
          tit: "我的海报",
          path: "/myhaibao"
        },
        {
          img: require("img/me/Administrator.png"),
          tit: "区域管理员",
          path: "/applyAdmin"
        },
        {
          img: require("img/me/vips.png"),
          tit: "VIP服务商",
          path: "/applyVip"
        },
        {
          img: require("img/me/icon1.png"),
          tit: "我的优惠券",
          path: "/myDiscount"
        },
        {
          img: require("img/me/icon2.png"),
          tit: "收货地址",
          path: "/myAddress"
        },
        {
          img: require("img/me/icon3.png"),
          tit: "我的评论",
          path: "/myComment"
        },
        // {
        //   img: require("img/me/icon4.png"),
        //   tit: "升级攻略",
        //   path: "/myStrategy"
        // },
        // {
        //   img: require("img/me/icon5.png"),
        //   tit: "商城使用说明",
        //   path: "/useDesc"
        // },
        {
          img: require("img/me/icon6.png"),
          tit: "反馈意见",
          path: "/myOpinion"
        }
      ], */
      tabList: [
        {
          icon: "\ue666",
          tit: "我的提货券",
          afterTit: "查看提货券",
          path: "/order"
        },
        {
          icon: "\ue60e",
          tit: "我的积分",
          afterTit: "积分明细",
          path: "/jifen"
        },
        {
          icon: "\ue629",
          tit: "我的收益",
          afterTit: "收益流水",
          path: "/income"
        },
        {
          icon: "\ue606",
          tit: "我的贡献值",
          afterTit: "贡献值明细",
          path: "/gxz"
        },
        {
          icon: "\ue621",
          tit: "我的会员",
          afterTit: "",
          path: "/myvip"
        },
        {
          icon: "\ue64d",
          tit: "平台规则须知",
          afterTit: "动态价格、积分等",
          path: "/rule"
        }
      ],
      Num: "",
      getInfoTime: 0,
      server_vip: false,
      region_agent: false
    };
  },
  mixins: [tojump, partnerLevelObj],
  watch: {
    token(val) {
      if (val) {
        this.getUserHomeInfo();
      }
    }
  },
  created() {
    this.init();
    /*  const reque = await partnerNum();
     this.Num = reque && reque.member_nums;
     this.server_vip = reque && reque.server_vip;
     this.region_agent = reque && reque.region_agent;
     updateUserInfo(); */
  },
  methods: {
    //未登录就调原生登录
    login() {
      login();
    },
    init() {
      this.echartsInit();
      if (this.token) {
        this.getUserHomeInfo();
      }
    },
    setHeadData(data) {
      for (let i of this.headData) {
        i.num = data[i.name];
      }
    },
    getUserHomeInfo() {
      let meInfo = this.$store.state.meInfo;
      if (meInfo) {
        this.userinfo = meInfo;
        this.setHeadData(meInfo);
        return;
      }
      Loading.open();
      getUserHomeInfo()
        .then(res => {
          this.$store.commit("setMeInfo", res || null);
          this.userinfo = res || {};
          this.setHeadData(res);
        })
        .finally(() => {
          Loading.close();
        });
    },
    echartsInit() {
      Loading.open();
      getScorePrice()
        .then(res => {
          let { date: xData, price: yData } = res;
          this.option = {
            xAxis: {
              type: "category",
              data: xData
            },
            yAxis: {
              type: "value",
              //max: 15,
              axisLine: {
                show: true,
                symbol: ["none", "arrow"],
                symbolSize: [5, 10],
                symbolOffset: [0, 8]
              },
              axisLabel: {
                formatter: function(value, index) {
                  return value.toFixed(2);
                }
              }
            },
            title: {
              show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
              text: "一周内每1积分价值变化",
              left: "center",
              top: "20",
              textStyle: {
                fontSize: 14,
                top: 30
              }
            },
            color: "#ED3E48",
            series: [
              {
                data: yData,
                type: "line",
                label: {
                  position: "top"
                }
              }
            ]
          };
        })
        .finally(() => {
          Loading.close();
        });
    },
    logout() {
      this.$refs.logOut.show("", () => {
        logout().then(() => {
          this.$refs.notice.show("退出成功", () => {
            this.$router.replace("/");
          });
        });
      });
    },
    seeFlag(url) {
      get_region_partner().then(res => {
        //  后台查不到数据说明没有申请过
        if (res == null) {
          // 不需要修改路径
        } else if (res.status == 0) {
          // 审核中
          url = "/applyflag";
        } else if (res.status == 1) {
          // 审核通过
          url = `/applyadopt?id=${res.id}`;
        } else if (res.status == -1) {
          // 拒绝通过不需要改路径
        }
        this.$router.push(url);
      });
    },
    seeVipFlag(url) {
      get_vip_server().then(res => {
        //  后台查不到数据说明没有申请过
        if (res == null) {
          // 不需要修改路径
        } else if (res.status == 0) {
          // 审核中
          url = "/vipApplyFlag";
        } else if (res.status == 1) {
          // 审核通过
          url = `/vipApplyDetail?id=${res.id}`;
        } else if (res.status == -1) {
          // 拒绝通过不需要改路径
        }
        this.$router.push(url);
      });
    },

    to(url) {
      if (url === "/applyAdmin") {
        this.seeFlag(url);
        return;
      }
      if (url === "/applyVip") {
        this.seeVipFlag(url);
        return;
      }
      if (url) {
        this.$router.push(url);
      }
    }
  },
  computed: {
    ...mapState(["userInfo", "token"])
  },
  components: {
    confirm,
    notice,
    myCharts
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.me_warp {
  padding-bottom: size(100);
  .header {
    /*  background-image: linear-gradient(236deg, #ef5456 0%, #e70002 100%); */
    background: #f2f2f2;
    .head_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: size(30);

      .part_left {
        height: size(100);
        line-height: size(100);
        .user {
          width: size(100);
          height: size(100);
          border-radius: 50%;
          vertical-align: middle;
        }
        .iconfont {
          font-size: size(100);
        }
        &:after {
          content: "";
          height: 100%;
          width: 0;
          display: inline-block;
          vertical-align: middle;
        }
        & > span:nth-of-type(1) {
          margin-left: size(30);
        }
      }
      .part_right {
        height: size(100);
        line-height: size(100);
        .iconfont {
          margin: 0 size(10);
          font-size: size(30);
        }
        .code {
          color: #ed3e48;
        }
      }
      .login-btn {
        background: $color-main;
        color: white;
        font-size: size(28);
        padding: size(10) size(20);
        border-radius: size(24);
      }
    }
    .head_body {
      padding: size(20);
      display: flex;
      justify-content: center;
      .count {
        border-right: 1px solid #333;
        text-align: center;
        padding: 0 size(15);
        font-size: size(30);
        color: #ed3e48;
        & > div {
          margin-bottom: size(10);
        }
      }
      .count:nth-last-of-type(1) {
        border-right: 0;
      }
    }
  }
  .my_contribution {
    > img {
      width: 100%;
    }
  }
  .crosswise_tab {
    box-sizing: border-box;
    height: size(162);
    border-bottom: size(2) solid #eaeaea;
    display: flex;
    .gang {
      width: size(4);
      height: size(52);
      background-color: #e5e5e5;
      margin: auto 0;
    }
    .crosswise_item {
      flex: 1;
      color: #000000;
      font-size: size(24);
      display: flex;
      flex-direction: column;
      align-items: center;
      & > img {
        width: size(64);
        height: size(64);
        margin-top: size(45);
        margin-bottom: size(2);
      }
      .title {
        text-align: center;
      }
    }
  }

  .vertical_tab {
    padding: 0 size(45);
    .vertical_item {
      height: size(122);
      line-height: size(122);
      border-bottom: size(2) solid #f5f5f5;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        & > img {
          width: size(36);
          height: size(36);
          margin: auto size(30) auto 0;
        }
        .title {
          flex: 1;
          font-size: size(28);
          color: #0c0422;
        }
      }
      .right {
        & > img {
          width: size(16);
        }
        & > span {
          font-size: size(28);
          margin-right: size(5);
        }
      }
    }
  }
}
</style>
