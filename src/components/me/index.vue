<template>
  <div class="me_warp">
    <div class="header">
      <div class="avater_warp" @click="tojump('/myMsg')">
        <img class="averer" :src="userInfo.avatar" alt />
        <div class="amend">
          <img src="~img/me/bianji.png" alt />
        </div>
      </div>
      <div class="user_name">{{userInfo.nickname}}</div>
      <div class="grade">{{partnerLevelObj[userInfo.partner_level]}}</div>
      <div class="team_no">伙伴 {{Num || 0}} 人</div>
    </div>
    <div class="crosswise_tab">
      <div class="crosswise_item" @click="tojump('/myVisitor')">
        <img src="~img/me/fangkexiaoxi.png" alt />
        <div class="title">访客记录</div>
      </div>
      <div class="gang"></div>
      <div class="crosswise_item" @click="tojump('/myPartner')">
        <img src="~img/me/wodehuoban.png" alt />
        <div class="title">我的伙伴</div>
      </div>
    </div>
    <div class="vertical_tab">
      <div class="vertical_item" v-for="(item,index) in tabList" :key="index">
        <div class="left" @click="to(item.path?item.path:'')">
          <img :src="item.img" alt />
          <div class="title">{{item.tit}}</div>
        </div>
        <div class="right">
          <img src="~img/icon/join-right.png" alt />
        </div>
      </div>
    </div>
    <div class="quit">
      <div class="btn-out" @click="logout">退出登录</div>
    </div>
    <confirm ref="logOut">确定退出吗？</confirm>
    <notice ref="notice"></notice>
  </div>
</template>

<script>
import tojump from "mixins/tojump";
import { partnerNum, updateUserInfo, get_region_partner ,get_vip_server} from "api/me";
import { mapState } from "vuex";
import partnerLevelObj from "mixins/partner-level-obj";
import { logout } from "api/login";
import confirm from "base/confirm";
import notice from "base/notice";
export default {
  data() {
    return {
      tabList: [
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
      ],
      Num: ""
    };
  },
  mixins: [tojump, partnerLevelObj],
  async mounted() {
    const reque = await partnerNum();
    this.Num = reque && reque.member_nums;
    updateUserInfo();
  },
  methods: {
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
      if(url === "/applyVip")
      {
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
    notice
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.me_warp {
  padding-bottom: size(100);
  .header {
    height: size(385);
    overflow: hidden;
    background-image: linear-gradient(236deg, #ef5456 0%, #e70002 100%);
    position: relative;
    .avater_warp {
      margin: size(36) auto size(28) auto;
      box-sizing: border-box;
      width: size(169);
      height: size(169);
      // border: size(2) solid #0c0422;
      border-radius: 50%;
      // padding: size(10);
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .amend {
        position: absolute;
        right: size(2);
        bottom: size(4);
        width: size(44);
        height: size(44);
        border-radius: 50%;
        background: #fff;
        padding: size(4);
        & > img {
          width: size(36);
          height: size(36);
          border-radius: 50%;
        }
      }
    }
    .user_name {
      height: size(63);
      line-height: size(63);
      font-size: size(46);
      color: #0c0423;
      text-align: center;
    }
    .grade {
      margin: size(8) auto 0 auto;
      width: size(158);
      height: size(43);
      line-height: size(43);
      text-align: center;
      background-color: #222;
      color: #fff;
      font-size: size(24);
      border-radius: size(6);
    }
    .team_no {
      height: size(37);
      line-height: size(37);
      font-size: size(26);
      color: #eee;
      position: absolute;
      right: size(30);
      bottom: size(9);
    }
  }
  .crosswise_tab {
    box-sizing: border-box;
    height: size(162);
    border-top: size(2) solid #eaeaea;
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
      }
    }
  }
  .quit {
    width: 100%;
    height: size(100);
    margin-top: size(30);
    text-align: center;
    .btn-out {
      display: inline-block;
      padding: size(10) size(50);
      margin: 0 auto;
      text-align: center;
      border-radius: size(50);
      background: #777;
      color: #ddd;
      font-size: size(26);
    }
  }
}
</style>