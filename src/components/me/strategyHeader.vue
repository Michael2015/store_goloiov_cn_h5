<template>
  <div class="header_warp">
    <div><img src="~img/me/time.png" alt class="icon" /></div>
    <div class="work_content">
      <div class="work_item">
        <div class="item_title">必完成任务</div>
        <div class="item_content" v-if="levelId === 0">购买一台golo x3</div>
        <div class="item_content" v-if="levelId !== 0">
          <span class="shi"></span>
          团队车联网专区产品销售总额≥{{moneyobj[levelId]}}万元
          <div class="now">已完成团队车联网专区产品销售总额：{{subordinate_sales_amount}}</div>
        </div>
      </div>
      <div class="work_item" v-if="levelId !== 0">
        <div class="item_title">任务二选一</div>
        <div class="item_content">
          <span class="kon"></span>
          下级团队没有{{partnerLevelObj[levelId+1]}}及以上合伙人，团队业绩≥{{moneyobj[levelId]}}万
          <div class="now" v-if="type === 0">已经完成销售总额{{subordinate_sales_amount}}</div>
        </div>
        <div class="item_content">
          <span class="kon"></span>
          当下级有{{partnerLevelObj[levelId+1]}}及以上合伙人，符合条件的下线中，除业绩最低的一条下线以外其他团队业绩≥{{moneyobj[levelId]}}万
          <div class="now"></div>
          <div class="now" v-if="type === 1" >已经完成销售总额{{subordinate_sales_amount}}</div>
        </div>
      </div>
    </div>
    <div class="toshop" v-if="levelId === 0" @click="purchasegolox3">立即购买</div>
  </div>
</template>

<script>
import partnerLevelObj from "mixins/partner-level-obj";
import tojump from 'mixins/tojump'
import { getmyteamincome } from "api/me";
import { mapState } from "vuex";
import { Toast } from 'lib'
export default {
  props: ["levelId"],
  data() {
    return {
      moneyobj: {
        "1": 3,
        "2": 6,
        "3": 12,
        "4": 36
      },
      subordinate_sales_amount:0,
      type:null
    };
  },
  mixins: [partnerLevelObj,tojump],
  mounted() {
    getmyteamincome(this.userInfo.uid).then(res => {
      console.log(res);
      if(res.code === 200){
        this.subordinate_sales_amount = res.data.subordinate_sales_amount;
        this.type = res.data.type
      }else {
        Toast(res.msg)
      }
    });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    purchasegolox3(){
      this.tojump('/goods/'+1)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~css/def";
.header_warp {
  background: #5898f7;
  padding: size(65) size(30) size(65) size(40);
  display: flex;
  color: #fff;
  position: relative;
  .icon {
    width: size(96);
    margin-right: size(40);
  }
  .work_content {
    .work_item {
      &:nth-child(2) {
        margin-top: size(20);
      }
      .item_title {
        font-size: size(32);
      }
      .item_content {
        font-size: size(28);
        margin-top: size(10);
        text-indent: -1rem;
        margin-left: 1em;
        line-height: size(35);
        .shi {
          display: inline-block;
          width: size(24);
          height: size(24);
          border: solid size(2) #ffffff;
          border-radius: 50%;
          position: relative;
          margin-right: size(9);
          &::after {
            content: "";
            display: block;
            width: size(10);
            height: size(10);
            background-color: #ffffff;
            position: absolute;
            left: 50%;
            right: 50%;
            transform: translateX(-50%) translateY(50%);
            border-radius: 50%;
          }
        }
        .kon {
          display: inline-block;
          width: size(24);
          height: size(24);
          border: solid size(2) #ffffff;
          border-radius: 50%;
          position: relative;
          margin-right: size(9);
        }
        .now {
          color: #c5dbfe;
          font-size: size(26);
          padding-left: size(33);
          margin-top: size(5);
        }
      }
    }
  }
  .toshop {
    position: absolute;
    right: size(24);
    bottom: size(16);
    font-size: size(28);
    color: #fff;
  }
}
</style>