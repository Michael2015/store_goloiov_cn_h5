<template>
  <div class="view">
    <top-head>我的贡献值</top-head>
    <div class="head">
      <div class="mid">
        <em>鹏城汽车鹏程汽车</em>
        <div class="rank">V{{contribution.user_info.partner_level}}</div>
        <div class="detail" @click="tojump('/my_contribution_detail')">贡献值详情&nbsp;></div>
      </div>
      <div class="content">
        <div class="legend">
          成长值&nbsp;&nbsp;
          <span>{{contribution.user_info.growth_value[0]}}/{{contribution.user_info.growth_value[1]}}</span>
        </div>
        <div class="legend">
          当前等级&nbsp;&nbsp;
          <span>V{{contribution.user_info.partner_level}}</span>
        </div>
      </div>
    </div>
    <legend>我的贡献值</legend>
    <div class="my_contribution">
      <div class="my_con_mid">
        <div class="my_con_mid-line my_con_mid-line-1">累计贡献值</div>
        <div class="my_con_mid-line my_con_mid-line-2">{{contribution.contribution_info.total}}</div>
        <div class="my_con_mid-line my_con_mid-line-3">
          <div class="my_con_mid-line-3-1">{{contribution.contribution_info.self_total}}</div>
          <div class="my_con_mid-line-3-2">{{contribution.contribution_info.team_total}}</div>
        </div>
        <div class="my_con_mid-line my_con_mid-line-4">
          <div class="my_con_mid-line-4-1">个人累计贡献值</div>
          <div class="my_con_mid-line-4-2">团队累计贡献值</div>
        </div>
      </div>
    </div>
    <div class="contribution_task">
      <legend>贡献值任务</legend>
      <ul class="list">
        <li v-for="(item,idx) in this.contribution.data" :key="idx">
          <div class="left">
            <img :src="require(`@/assets/img/me/contribution_task_${idx+1}.png`)" />
          </div>
          <div class="mid">
            <div class="top">
              <div class>{{item.title}}</div>
              <img src="~img/me/contribution_task_icon.png" />
              <span>+{{item.value}}</span>
            </div>
            <div class="bottom">{{item.title_text}}</div>
          </div>
          <div class="right">
            <div class="top">{{item.total}}</div>
            <div class="bottom">累计获得</div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
import { getUserContributionDetail } from "api/me";
import tojump from "mixins/tojump";
export default {
  mixins: [tojump],
  data() {
    return {
      contribution:{},
      img:'~img/me/contribution_task_1.png',
    };
  },
  created() {
    getUserContributionDetail().then(res => {
      this.contribution = res.data;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "~css/def";
.view {
  width: 96%;
  margin: 0 auto;
}
.head {
  @include bg("~img/me/my_contribution_bg.png");
  background-size: 101% 100%;
  width: 100%;
  height: size(270);
  text-align: center;
  position: relative;
  box-sizing: border-box;
  padding: size(40);
  border-radius: size(20);
}
.head .mid {
  height: size(45);
  line-height: size(45);
  font-size: size(40);
  text-align: left;
  width: 100%;
  color: #fff;
  > em {
    width: 40%;
    display: inline-block;
    float: left;
    font-style: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    color: #f6b18c;
  }
  > .rank {
    width: 20%;
    padding-left: 4%;
    color: #000;
    font-size: size(30);
    @include bg("~img/me/my_contribution_rank.png");
    float: left;
  }
  > .detail {
    float: right;
    font-size: size(30);
    color: #888;
  }
}
.content {
  margin-top: size(45);
  height: size(100);
}
.content .legend {
  height: size(50);
  font-size: size(30);
  width: 100%;
  line-height: size(50);
  display: block;
  color: #888;
  text-align: left;
  > span {
    color: #eee;
  }
}
legend {
  width: 100%;
  line-height: size(100);
  height: size(100);
  padding-left: size(30);
  font-size: size(38);
}
.my_contribution {
  > .my_con_mid {
    width: 100%;
    height: size(400);
    @include bg("~img/me/my_contribution_table.png");
    .my_con_mid-line {
      width: 100%;
      text-align: center;
      color: #8f5f5f;
      &.my_con_mid-line-1 {
        padding-top: size(60);
      }
      &.my_con_mid-line-2 {
        padding-top: size(30);
        font-size: size(50);
        color: #712e2e;
        font-weight: bold;
      }
      &.my_con_mid-line-3 {
        display: flex;
        flex: 1;
        margin-top: size(100);
        font-size: size(40);
        color: #712e2e;
        > div {
          width: 50%;
          text-align: center;
        }
      }
      &.my_con_mid-line-4 {
        display: flex;
        flex: 1;
        margin-top: size(15);
        font-size: size(25);
        color: #8f5f5f;
        > div {
          width: 50%;
          text-align: center;
        }
      }
    }
  }
}
.contribution_task {
  border: size(2) solid #eee;
  padding: size(10);
  border-radius: size(10);
  margin-top: size(30);
  margin-bottom: size(100);
  box-shadow: size(2) size(2) size(2) #999;
  > legend {
    padding-left: size(28);
  }
  > .list {
    > li {
      margin-bottom: size(50);
    }
    .left {
      img {
        height: size(100);
        float: left;
      }
    }
    > li:after {
      content: "";
      height: 0px;
      width: 0px;
      clear: both;
      display: block;
      overflow: hidden;
    }
    .mid {
      float: left;
      padding-left: size(20);
      > .top {
        height: size(50);
        line-height: size(50);
        > div {
          float: left;
        }
        > img {
          float: left;
          height: size(32);
          margin: size(9) size(12) size(9) size(15);
        }
        > span {
          float: left;
          color: #e60000;
        }
      }
      .bottom {
        height: size(50);
        line-height: size(50);
        font-size: size(25);
        color: #999;
      }
    }
    .right {
      float: right;
      > div {
        height: size(50);
        line-height: size(50);
        text-align: right;
        &.bottom {
          color: #999;
          font-size: size(25);
        }
      }
    }
  }
}
</style>