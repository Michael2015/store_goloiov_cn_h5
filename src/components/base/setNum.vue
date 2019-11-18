<template>
  <div v-show="isShow">
    <popup-goods @mask-click="hide">
      <div class="mask_box" @click.stop>
        <div class="good_msg">
          <img v-if="info.slider_image" :src="info.slider_image[0]" alt />
          <div class="show_price">
            <div
              class="price"
            >价格：¥{{info.newbornzone.is_newborn?info.newbornzone.price:(role===0?info.price:info.vip_price)}}</div>
            <div class="setter">请选择规格属性</div>
          </div>
        </div>
        <div v-for="(overitem,overindex) in suklist" :key="overindex">
          <div class="title">{{overitem.title}}</div>
          <div class="selectIcon">
            <div
              :class="{icon:true,active:selectList[overindex] == index}"
              v-for="(sukitem,index) in overitem.suks"
              :key="index"
              @click="checkIcon(overindex,index)"
            >{{sukitem}}</div>
          </div>
        </div>
        <div class="title">数量</div>
        <div class="setcount">
          <div class="reduce" @click="reduce">-</div>
          <input class="count" type="number" v-model="total_num" />
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </popup-goods>
  </div>
</template>

<script>
import showHide from "mixins/show-hide";
import popupGoods from "ui/popup-goods";
import { Toast } from "lib";
import { mapState } from "vuex";
export default {
  components: {
    popupGoods
  },
  mixins: [showHide],
  data() {
    return {
      isShow: false,
      total_num: 1,
      info: {
        newbornzone: {}
      },
      // 假设后端传来的suk
      suklist: [
        {
          title: "颜色",
          suks: [
            "灰色",
            "白色",
            "黑色",
            "字体很多很多怎么办",
            "字体很多很多很多很多很多怎么办"
          ]
        },
        {
          title: "尺寸",
          suks: ["2G", "3G", "4G", "66666666G"]
        }
      ],
      // 对应的选择suk下标集合,有id用最好id,数据结构只是假设
      selectList: [0, 0]
    };
  },
  methods: {
    reduce() {
      if (this.total_num <= 1) {
        return;
      }
      this.total_num = --this.total_num;
    },
    add() {
      if (this.info.newbornzone.is_newborn) {
        if (this.total_num + 1 > this.info.newbornzone.limit_num) {
          Toast(`最多下单${this.info.newbornzone.limit_num}个`);
          return;
        }
      }
      this.total_num = ++this.total_num;
    },
    show(info) {
      this.isShow = true;
      this.info = info;
      console.log(this.info);
    },
    checkIcon(outindex,inContent){
      this.$set(this.selectList,outindex,inContent)
      // let selectList = this.selectList
      // selectList[outindex] = inContent;
      // this.selectList = selectList;
      // console.log(this.selectList)
    }
  },
  computed: {
    ...mapState(["role"])
  },
  watch: {
    total_num(v) {
      if (this.info.newbornzone.is_newborn) {
        if (v > this.info.newbornzone.limit_num) {
          Toast(`最多下单${this.info.newbornzone.limit_num}个`);
          this.total_num = this.info.newbornzone.limit_num;
          return;
        }
      }
      if (v > 50) {
        Toast("最多下单50个");
        this.total_num = 50;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/def";

.mask_box {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  // height: size(900);
  padding: size(36) size(30) size(176) size(30);
  .good_msg {
    display: flex;
    > img {
      width: size(196);
      height: size(196);
      border-radius: size(4);
      margin-right: size(20);
    }
    .show_price {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .price {
        font-size: size(28);
        color: #fe0000;
        line-height: size(35);
      }
      .setter {
        font-size: size(28);
        color: #333333;
        line-height: size(35);
      }
    }
  }
  .title {
    font-size: size(28);
    line-height: size(35);
    color: #4b4b4b;
    margin-top: size(42);
  }
  .selectIcon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .icon {
      height: size(70);
      line-height: size(70);
      border-radius: size(6);
      border: size(1) solid #7f7f7f;
      padding: 0 size(25);
      color: #363636;
      font-size: size(24);
      margin: size(12) size(30) 0 0;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .active {
      color: #fe0000;
      border: size(1) solid #fe0000;
    }
  }
  .setcount {
    width: size(320);
    height: size(70);
    line-height: size(70);
    display: flex;
    justify-content: space-between;
    font-size: size(28);
    border-radius: size(2);
    margin-top: size(12);
    box-sizing: border-box;
    .add {
      height: size(70);
      width: size(94);
      text-align: center;
      color: #696969;
      border: size(1) solid #878787;
      box-sizing: content-box;
    }
    .reduce {
      height: size(70);
      width: size(94);
      text-align: center;
      color: #696969;
      border: size(1) solid #878787;
      box-sizing: content-box;
    }
    .count {
      height: size(70);
      flex: 1;
      text-align: center;
      color: #363636;
      border-top: size(1) solid #878787;
      border-bottom: size(1) solid #878787;
      box-sizing: content-box;
      padding: 0;
      border-radius: 0;
    }
  }
}
</style>