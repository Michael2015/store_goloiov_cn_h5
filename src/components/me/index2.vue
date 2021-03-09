<template>
  <div class="me_warp">
    <div class='header'>
      <div class="head_top">
        <div class="part_left">
          <i class="iconfont user">&#xe640;</i>
          <span>赵子龙</span>
          <span>&nbsp;|&nbsp;</span>
          <span>原始股东</span>
        </div>
        <div class="part_right">
          <i class="iconfont code">&#xe646;</i>
          <i class="iconfont setup"
             @click="$router.push('/setup')">&#xe60b;</i>
        </div>
      </div>
      <div class="head_body">
        <div class='count'
             v-for='(ele,i) in headData'
             :key='i'>
          <div>{{ele.num}}</div>
          <div>{{ele.title}}</div>
        </div>
      </div>
    </div>
    <div class="echarts">
      <my-charts :option='option'
                 key='1' />
    </div>
    <div class="vertical_tab">
      <div class="vertical_item"
           v-for="(item,index) in tabList"
           :key="index"
           @click="to(item.path?item.path:'')">
        <div class="left">
          <i class="iconfont">{{item.icon}}</i>&nbsp;
          <div class="title">{{item.tit}}</div>
        </div>
        <div class="right">
          <span>{{item.afterTit}}</span>
          <img src="~img/icon/join-right.png"
               alt />
        </div>
      </div>
    </div>

    <confirm ref="logOut">确定退出吗？</confirm>
    <notice ref="notice"></notice>
  </div>
</template>
<script>
import tojump from "mixins/tojump";
import { partnerNum, updateUserInfo, get_region_partner, get_vip_server } from "api/me";
import { mapState } from "vuex";
import partnerLevelObj from "mixins/partner-level-obj";
import { logout } from "api/login";
import confirm from "base/confirm";
import notice from "base/notice";
import myCharts from 'com/common/echarts'

export default {
  data() {
    return {
      option: {},
      headData: [{
        num: 0,
        title: '我的积分',
        name: 'point'
      },
      {
        num: 0,
        title: '我的收益',
        name: 'income'
      },
      {
        num: 0,
        title: '我的贡献值',
        name: 'attribute'
      },
      {
        num: 0,
        title: '股东排名',
        name: 'rank'
      }],
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
      tabList: [{
        icon: '\ue666',
        tit: "我的订单",
        afterTit: '查看全部订单',
        path: "/order"
      },
      {
        icon: '\ue60e',
        tit: "我的积分",
        afterTit: '积分明细',
        path: "/jifen"
      },
      {
        icon: '\ue629',
        tit: "我的收益",
        afterTit: '收益流水',
        path: "/income"
      },
      {
        icon: '\ue606',
        tit: "我的贡献值",
        afterTit: '贡献值明细',
        path: "/gxz"
      },
      {
        icon: '\ue621',
        tit: "我的会员",
        afterTit: '',
        path: "/myvip"
      },
      {
        icon: '\ue64d',
        tit: "平台规则须知",
        afterTit: '动态价格、积分等',
        path: "/jifen"
      }
      ],
      Num: "",
      server_vip: false,
      region_agent: false,
    };
  },
  mixins: [tojump, partnerLevelObj],
  async mounted() {
    this.echartsInit()
    const reque = await partnerNum();
    this.Num = reque && reque.member_nums;
    this.server_vip = reque && reque.server_vip;
    this.region_agent = reque && reque.region_agent;
    updateUserInfo();
  },
  methods: {
    echartsInit() {
      this.option = {
        xAxis: {
          type: 'category',
          data: ['13.00', '12.01', '13.02', '13.03', '13.04', '13.05', '13.06']
        },
        yAxis: {
          type: 'value',
          max: 15,
          axisLine: {
            show: true,
            symbol: ['none', 'arrow'],
            symbolSize: [5, 10],
            symbolOffset: [0, 8]
          },
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(2)
            }
          }
        },
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: '主标题',
          left: 'center',
          top: '20',
          textStyle: {
            fontSize: 14,
            top: 30,
          }
        },
        color: '#ED3E48',
        series: [{
          data: [4.00, 5.00, 6.00, 1.00, 8.00, 9.00, 2.00],
          type: 'line',
          itemStyle: { normal: { label: { show: true } } }
        }]
      };
      setInterval(() => {
        this.option.series[0].data = Array.from({ length: 7 }, (ele, ind) => {
          return (Math.random() * 10).toFixed(2)
        })
      }, 3000)
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
      this.$router.push(url);
    }
  },
  computed: {
    ...mapState(["userInfo"])
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
        .user {
          font-size: size(80);
          vertical-align: middle;
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